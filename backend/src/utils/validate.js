exports.requireFields = (obj, fields) => {
  for (const f of fields) {
    if (!obj[f]) throw Object.assign(new Error(`${f} is required.`), { status: 400, code: 'MISSING_FIELD' });
  }
};
