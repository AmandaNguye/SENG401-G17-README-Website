import supertest from 'supertest';
import app from '..';
import mongoose from 'mongoose';

const request = supertest(app);

beforeAll(done => {
    done()
})

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})



describe("Testing Register:", () => {
    beforeAll(async () => {
        await request.delete("/test");
    });

    afterAll(async () => {
        await request.delete("/test");
    });

    test("TC01 - valid inputs", async () => {
        const res = await request
            .post("/register")
            .send({ username: "test", password: 'test', email: "test@test.test" })
            .expect({
                message: 'Success'
            })

    })

    test("TC02 - duplicated inputs", async () => {
        const res = await request
            .post("/register")
            .send({ username: "test", password: 'a', email: "a@a" })
            .expect({
                message: 'Username or email has already been taken'
            })
    })

    test("TC03 - duplicated email", async () => {
        const res = await request
            .post("/register")
            .send({ username: "a", password: 'a', email: "test@test.test" })
            .expect({
                message: 'Username or email has already been taken'
            })
    })

    test("TC04 - no username", async () => {
        const res = await request
            .post("/register")
            .send({ password: 'a', email: "not@duplicate.com" })
            .expect(404);
    })

    test("TC05 - no email", async () => {
        const res = await request
            .post("/register")
            .send({ password: 'a', username: "NotDuplicate" })
            .expect(404);
    })

    test("TC06 - no password", async () => {
        const res = await request
            .post("/register")
            .send({ username: "NotDuplicate", email: "not@duplicate.com" })
            .expect(404);
    })
})

describe("Testing Login:", () => {

    test("TC07 - valid log in info", async () => {
        const res = await request
            .post("/login")
            .send({ username: "a", password: 'a' });

        expect(res.body.message).toBe('Success')

    })

    test("TC08 - wrong password", async () => {
        const res = await request
            .post("/login")
            .send({ username: "a", password: 'wrong' })
            .expect({
                message: 'Invalid Username or Password'
            })
    })

    test("TC09 - wrong username", async () => {
        const res = await request
            .post("/login")
            .send({ username: "wrong", password: 'a' })
            .expect({
                message: 'Invalid Username or Password'
            })
    })

    test("TC10 - no username", async () => {
        const res = await request
            .post("/login")
            .send({ password: 'a' })
            .expect(404);
    })

    test("TC11 - no password", async () => {
        const res = await request
            .post("/login")
            .send({ username: "a" })
            .expect(404);
    })
})