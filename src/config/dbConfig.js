const { Neogma, ModelFactory, QueryRunner } = require('neogma');

/* --> create a neogma instance and database connection */
const neogma = new Neogma(
    {
        /* --> use connection details */
        url: `${process.env.NEO4J_PROTOCOL}://${process.env.NEO4J_HOST}:${process.env.NEO4J_PORT}`,
        username: `${process.env.NEO4J_USERNAME}`,
        password: `${process.env.NEO4J_PASSWORD}`,
    },
    {
        logger: console.log,
    }
);

const queryRunner = new QueryRunner({
    driver: neogma.driver,
    logger: console.log
})

module.exports = {
    ModelFactory, neogma, queryRunner
}