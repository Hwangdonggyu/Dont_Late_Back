const pagination = (req, res, next) => {
    const page = req.query.page ?? "1"; 
    const limit = req.query.limit ?? "20";
    const take = Number(limit) || 20;
    const skip = (Number(page) - 1) * take;
  
    req.take = take;
    req.skip = skip;
  
    next();
  };

  module.exports = pagination;