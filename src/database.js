// const {PrismaClient} = require("@prisma/client")
const { PrismaClient } = require('../node_modules/.prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;