import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Typography, Input, Select, Radio, Card, Tabs, Tag, Space, Alert, Button, Spin } from 'antd';
import {
  SearchOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ShopOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import { getBusinesses } from '../../api/businesses';
import BusinessCard from '../../components/common/BusinessCard';
import SectionTitle from '../../components/common/SectionTitle';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const MapView = React.lazy(() => import('../../components/common/MapView'));

const fallbackBusinesses = [
  {
    id: 'b-1',
    name: 'Ontario Exhaust Pros',
    province: 'ON',
    city: 'Toronto',
    address: '120 Adelaide St W, Toronto, ON M5H 1T1',
    latitude: 43.6532,
    longitude: -79.3832,
    phone: '(416) 555-0199',
    email: 'info@ontarioexhaustpros.ca',
    website: 'https://ontarioexhaustpros.ca',
    certified: true,
    certification: { name: 'Technician', level: 'Technician' },
    services: 'Hood cleaning, duct grease extraction, fan hinge kit installation',
  },
  {
    id: 'b-2',
    name: 'Clean Ducts Inc',
    province: 'ON',
    city: 'Ottawa',
    address: '45 O\'Connor St, Ottawa, ON K1P 1A4',
    latitude: 45.4215,
    longitude: -75.6972,
    phone: '(613) 555-0142',
    email: 'service@cleanductsottawa.ca',
    website: 'https://cleanductsottawa.ca',
    certified: true,
    certification: { name: 'Supervisor', level: 'Supervisor' },
    services: 'Commercial kitchen exhaust, supply air balancing, fire barrier inspections',
  },
  {
    id: 'b-3',
    name: 'GrillGuard Services',
    province: 'ON',
    city: 'Hamilton',
    address: '100 King St W, Hamilton, ON L8P 1A2',
    latitude: 43.2557,
    longitude: -79.8711,
    phone: '(905) 555-0188',
    email: 'contact@grillguardservices.com',
    website: 'https://grillguardservices.com',
    certified: true,
    certification: { name: 'Technician', level: 'Technician' },
    services: 'Deep degreasing, grease filter exchange, rooftop pollution control unit maintenance',
  },
  {
    id: 'b-4',
    name: 'Exhaust Masters',
    province: 'ON',
    city: 'London',
    address: '255 Queens Ave, London, ON N6A 5R8',
    latitude: 42.9849,
    longitude: -81.2453,
    phone: '(519) 555-0112',
    email: 'london@exhaustmasters.ca',
    website: 'https://exhaustmasterslondon.ca',
    certified: false,
    certification: null,
    services: 'General restaurant ventilation, sheet metal installation, dryer exhaust',
  },
  {
    id: 'b-5',
    name: 'VentRight Solutions',
    province: 'ON',
    city: 'Mississauga',
    address: '100 City Centre Dr, Mississauga, ON L5B 2C9',
    latitude: 43.589,
    longitude: -79.6441,
    phone: '(905) 555-0177',
    email: 'support@ventrightsolutions.ca',
    website: 'https://ventrightsolutions.ca',
    certified: true,
    certification: { name: 'Inspector', level: 'Inspector' },
    services: 'Combustible grease depth measurement, insurance compliance audit, NFPA 96 certifications',
  },
  {
    id: 'b-6',
    name: 'ProClean Exhaust',
    province: 'ON',
    city: 'Brampton',
    address: '25 Peel Centre Dr, Brampton, ON L6T 3R5',
    latitude: 43.7315,
    longitude: -79.7624,
    phone: '(905) 555-0165',
    email: 'dispatch@procleanexhaust.com',
    website: 'https://procleanexhaust.com',
    certified: true,
    certification: { name: 'Technician', level: 'Technician' },
    services: 'Emergency kitchen exhaust degreasing, access panel installation, fan maintenance',
  },
];

export default function FindAProPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('ALL');
  const [certificationFilter, setCertificationFilter] = useState(searchParams.get('certified') === 'true' ? 'certified' : 'all');
  const [activeMapTab, setActiveMapTab] = useState('certified');

  useEffect(() => {
    getBusinesses()
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setBusinesses(data);
        } else {
          setBusinesses(fallbackBusinesses);
        }
      })
      .catch(() => {
        setBusinesses(fallbackBusinesses);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((b) => {
      // Certification status filter
      if (certificationFilter === 'certified' && !b.certified) return false;
      if (certificationFilter === 'licensed' && b.certified) return false;

      // Province filter
      if (selectedProvince !== 'ALL' && b.province !== selectedProvince) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = b.name?.toLowerCase().includes(query);
        const matchesCity = b.city?.toLowerCase().includes(query);
        const matchesServices = b.services?.toLowerCase().includes(query);
        return matchesName || matchesCity || matchesServices;
      }

      return true;
    });
  }, [businesses, certificationFilter, selectedProvince, searchQuery]);

  // Two map pins sets (meeting decision #6)
  const certifiedPins = useMemo(() => {
    return businesses
      .filter((b) => b.certified && b.latitude && b.longitude)
      .map((b) => ({ id: b.id, name: b.name, latitude: b.latitude, longitude: b.longitude, certified: true }));
  }, [businesses]);

  const allContractorPins = useMemo(() => {
    return businesses
      .filter((b) => b.latitude && b.longitude)
      .map((b) => ({ id: b.id, name: b.name, latitude: b.latitude, longitude: b.longitude, certified: b.certified }));
  }, [businesses]);

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Banner */}
      <div style={{ background: '#1B4F72', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div className="container">
          <Tag color="#E67E22" style={{ marginBottom: 12, fontSize: 14, padding: '2px 10px' }}>
            Accredited Directory
          </Tag>
          <Title level={1} style={{ color: '#fff', marginBottom: 16 }}>
            Find Certified Kitchen Exhaust Cleaners
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 800, margin: '0 auto' }}>
            Connect with KESCA verified contractors who adhere to the preventative maintenance code
            and prove compliance with Before/After photo documentation.
          </Paragraph>
        </div>
      </div>

      {/* Prominent Consumer Callout (Meeting Decision #5 & #9) */}
      <div style={{ background: '#FFF8EE', borderBottom: '1px solid #FFE4C4', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <Space>
            <ShopOutlined style={{ fontSize: 24, color: '#E67E22' }} />
            <div>
              <Text strong style={{ fontSize: 16, color: '#1B4F72', display: 'block' }}>
                Looking for KESCA Certified Restaurants?
              </Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                Verify if your favourite restaurant kitchen is serviced by a certified exhaust technician.
              </Text>
            </div>
          </Space>
          <Link to="/verify">
            <Button
              type="primary"
              size="large"
              style={{
                background: '#E67E22',
                borderColor: '#E67E22',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(230, 126, 34, 0.35)',
              }}
              icon={<SafetyCertificateOutlined />}
            >
              Verify Certificate Code
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          {/* Two Maps Section (Meeting Decision #6) */}
          <Card style={{ marginBottom: 32, borderRadius: 12, overflow: 'hidden' }} bodyStyle={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <Title level={3} style={{ margin: 0, color: '#1B4F72' }}>
                  Interactive Coverage Map
                </Title>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  Switch between certified contractor locations and all registered contractors.
                </Text>
              </div>
              <Radio.Group
                value={activeMapTab}
                onChange={(e) => setActiveMapTab(e.target.value)}
                buttonStyle="solid"
                size="middle"
              >
                <Radio.Button value="certified" style={{ background: activeMapTab === 'certified' ? '#1B4F72' : undefined }}>
                  <SafetyCertificateOutlined style={{ marginRight: 6 }} />
                  Map 1: Certified Locations ({certifiedPins.length})
                </Radio.Button>
                <Radio.Button value="licensed">
                  <EnvironmentOutlined style={{ marginRight: 6 }} />
                  Map 2: All Licensed Contractors ({allContractorPins.length})
                </Radio.Button>
              </Radio.Group>
            </div>

            <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #E2E8F0' }}>
              <React.Suspense
                fallback={
                  <div style={{ height: 400, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spin tip="Loading map..." />
                  </div>
                }
              >
                <MapView
                  pins={activeMapTab === 'certified' ? certifiedPins : allContractorPins}
                  center={[43.9, -79.5]}
                  zoom={7}
                  height="420px"
                />
              </React.Suspense>
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <Text type="secondary" style={{ fontSize: 13 }}>
                * Ontario service area shown. KML boundary layers and GPS tracking enabled.
              </Text>
              <Space size={16}>
                <span style={{ fontSize: 13, color: '#1B4F72', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#1B4F72', display: 'inline-block' }}></span>
                  Certified Contractors
                </span>
                <span style={{ fontSize: 13, color: '#666', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#999', display: 'inline-block' }}></span>
                  Registered / Uncertified
                </span>
              </Space>
            </div>
          </Card>

          {/* Search & Filter Controls */}
          <Card style={{ marginBottom: 32, borderRadius: 8 }} bodyStyle={{ padding: 20 }}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={10}>
                <Search
                  placeholder="Search by company name, city, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                  size="large"
                  prefix={<SearchOutlined style={{ color: '#aaa' }} />}
                />
              </Col>
              <Col xs={12} md={6}>
                <Select
                  value={selectedProvince}
                  onChange={setSelectedProvince}
                  style={{ width: '100%' }}
                  size="large"
                >
                  <Option value="ALL">All Provinces</Option>
                  <Option value="ON">Ontario (ON)</Option>
                  <Option value="QC">Quebec (QC)</Option>
                  <Option value="BC">British Columbia (BC)</Option>
                  <Option value="AB">Alberta (AB)</Option>
                </Select>
              </Col>
              <Col xs={12} md={8}>
                <Select
                  value={certificationFilter}
                  onChange={setCertificationFilter}
                  style={{ width: '100%' }}
                  size="large"
                >
                  <Option value="all">Show All Companies ({businesses.length})</Option>
                  <Option value="certified">Certified Only ({businesses.filter((b) => b.certified).length})</Option>
                  <Option value="licensed">Licensed / Uncertified ({businesses.filter((b) => !b.certified).length})</Option>
                </Select>
              </Col>
            </Row>
          </Card>

          {/* Results List */}
          <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4} style={{ margin: 0, color: '#1B4F72' }}>
              Directory Results ({filteredBusinesses.length} found)
            </Title>
            <Text type="secondary" style={{ fontSize: 14 }}>
              Showing {selectedProvince === 'ALL' ? 'Canada-wide' : selectedProvince}
            </Text>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Spin size="large" tip="Loading directory..." />
            </div>
          ) : filteredBusinesses.length > 0 ? (
            <Row gutter={[24, 24]}>
              {filteredBusinesses.map((b) => (
                <Col xs={24} sm={12} lg={8} key={b.id}>
                  <BusinessCard business={b} />
                </Col>
              ))}
            </Row>
          ) : (
            <Card style={{ textAlign: 'center', padding: '40px 20px', borderRadius: 8 }}>
              <FilterOutlined style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
              <Title level={4} style={{ color: '#1B4F72' }}>No matching contractors found</Title>
              <Paragraph style={{ color: '#666' }}>
                Try adjusting your search criteria or clearing filters.
              </Paragraph>
              <Button onClick={() => { setSearchQuery(''); setSelectedProvince('ALL'); setCertificationFilter('all'); }}>
                Reset Filters
              </Button>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
