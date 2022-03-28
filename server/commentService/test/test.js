import supertest from 'supertest';
import app from '../index.js';
import mongoose from 'mongoose';

const requestCaller = supertest(app);

const jwtToken = process.env.JWT_TOKEN;

beforeAll(done => {
    done()
})

afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})

describe("Testing Get Comments:", () => {

    test("TC35 - get comments of a post", async () => {
        const res = await requestCaller
            .get("/posts/623d37dd7a040c89d1ec3e1f/comments")
            .set('Accept', 'application/json')
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
    })

    test("TC36 - get post by ID", async () => {
        const res = await requestCaller
            .get("/posts/6237ee4b1ff37b07f2870daf/comments/623a1b4b2b087b1ee8d51001")
            .set('Accept', 'application/json')
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
    })


    test("TC37 - get comments of a post while logged in", async () => {
        const res = await requestCaller
            .get("/posts/623d37dd7a040c89d1ec3e1f/comments")
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
    })

    test("TC38 - get post by ID  while logged in", async () => {
        const res = await requestCaller
            .get("/posts/6237ee4b1ff37b07f2870daf/comments/623a1b4b2b087b1ee8d51001")
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
        expect(res.body.lamed).toEqual(true);
    })
})

describe("Testing Create Comment:", () => {
    test("TC39 - create comment without log in", async () => {
        const res = await requestCaller
            .post("/posts/6237f52fd2672cc1836f0b6e/comments");

        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

    test("TC40 - create post with content", async () => {
        const res = await requestCaller
            .post("/posts/6237f52fd2672cc1836f0b6e/comments")
            .send({ content: "content" })
            .set('x-access-token', jwtToken)
            .expect(200);
        expect(res.body.result["content"]).toEqual("content");

        await requestCaller.delete(`/posts/${res.body.result._id}`)
            .set('x-access-token', jwtToken);
    })

    test("TC41 - create post without content", async () => {
        const res = await requestCaller
            .post("/posts/6237f52fd2672cc1836f0b6e/comments")
            .send({})
            .set('x-access-token', jwtToken)
            .expect(406)
    })

    test("TC42 - create post without post", async () => {
        const res = await requestCaller
            .post("/posts//comments")
            .send({ content: "content" })
            .set('x-access-token', jwtToken)
            .expect(404)
    })
})

describe("Testing Vote Comment:", () => {
    test("TC43 - fame Comment while logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237ee4b1ff37b07f2870daf/comments/623a1b4b2b087b1ee8d51001/vote")
            .send({ voteType: "fame" })
            .set('x-access-token', jwtToken)
            .expect(200);
    })

    test("TC44 - fame Comment while not logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237ee4b1ff37b07f2870daf/comments/623a1b4b2b087b1ee8d51001/vote")
            .send({ voteType: "fame" });
        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

    test("TC45 - fame Comment while logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237ee4b1ff37b07f2870daf/comments/623a1b4b2b087b1ee8d51001/vote")
            .send({ voteType: "lame" })
            .set('x-access-token', jwtToken)
            .expect(200);
    })

    test("TC46 - fame Comment while not logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237ee4b1ff37b07f2870daf/comments/623a1b4b2b087b1ee8d51001/vote")
            .send({ voteType: "lame" });
        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

})

describe("Testing Delete Comment:", () => {
    test("TC47 - delete Comment while not logged in", async () => {
        const res = await requestCaller
            .delete("/posts/6237ee4b1ff37b07f2870daf/comments/623a1b4b2b087b1ee8d51001")
        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

    test("TC48 - delete owned Comment while logged in", async () => {
        const post = await requestCaller
            .post("/posts/6237f52fd2672cc1836f0b6e/comments")
            .send({ content: "content" })
            .set('x-access-token', jwtToken);

        const id = post.body.result._id
        const res = await requestCaller
            .delete(`/posts/6237f52fd2672cc1836f0b6e/comments/${id}`)
            .set('x-access-token', jwtToken)
            .expect(204);
    })

    test("TC49 - delete unowned Comment while logged in", async () => {
        const res = await requestCaller
            .delete(`/posts/6237ee4b1ff37b07f2870daf/comments/623a1b4b2b087b1ee8d51001`)
            .set('x-access-token', jwtToken)
            .expect(400);
    })
})