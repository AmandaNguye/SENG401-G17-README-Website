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

describe("Testing Get Posts:", () => {

    test("TC12 - get all posts", async () => {
        const res = await requestCaller
            .get("/posts")
            .set('Accept', 'application/json')
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
    })

    test("TC13 - get post by ID", async () => {
        const res = await requestCaller
            .get("/posts/6237f52fd2672cc1836f0b6e")
            .set('Accept', 'application/json')
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
    })

    test("TC14 - get post by keyword", async () => {
        const res = await requestCaller
            .get("/posts?q=test")
            .set('Accept', 'application/json')
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
    })

    test("TC15 - get all posts while logged in", async () => {
        const res = await requestCaller
            .get("/posts")
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
    })

    test("TC16 - get post by ID  while logged in", async () => {
        const res = await requestCaller
            .get("/posts/6237f52fd2672cc1836f0b6e")
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
        expect(res.body.lamed).toEqual(true);
    })

    test("TC17 - get post by keyword  while logged in", async () => {
        const res = await requestCaller
            .get("/posts")
            .query({ q: "test" })
            .set('Accept', 'application/json')
            .set('x-access-token', jwtToken)
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
    })
})

describe("Testing Create Post:", () => {
    test("TC18 - create post without log in", async () => {
        const res = await requestCaller
            .post("/posts");

        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

    test("TC19 - create post with content, tag, title", async () => {
        const res = await requestCaller
            .post("/posts")
            .send({ title: 'test', content: "content", tag: "test" })
            .set('x-access-token', jwtToken);
        expect(res.body.result["title"]).toEqual("test");
        expect(res.body.result["content"]).toEqual("content");

        await requestCaller.delete(`/posts/${res.body.result._id}`)
            .set('x-access-token', jwtToken);
    })

    test("TC20 - create post with content, title", async () => {
        const res = await requestCaller
            .post("/posts")
            .send({ title: 'test', content: "content" })
            .set('x-access-token', jwtToken);
        expect(res.body.result["title"]).toEqual("test");
        expect(res.body.result["content"]).toEqual("content");

        await requestCaller.delete(`/posts/${res.body.result._id}`)
            .set('x-access-token', jwtToken);
    })

    test("TC21 - create post without title", async () => {
        const res = await requestCaller
            .post("/posts")
            .send({ content: "content", tag: "test" })
            .set('x-access-token', jwtToken)
            .expect(406)
    })

    test("TC22 - create post without content", async () => {
        const res = await requestCaller
            .post("/posts")
            .send({ title: "test", tag: "test" })
            .set('x-access-token', jwtToken)
            .expect(406)
    })
})

describe("Testing Vote Posts:", () => {
    test("TC23 - fame post while logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237f53dd2672cc1836f0b71/vote")
            .send({ voteType: "fame" })
            .set('x-access-token', jwtToken)
            .expect(200);
    })

    test("TC24 - fame post while not logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237f53dd2672cc1836f0b71/vote")
            .send({ voteType: "fame" });
        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

    test("TC25 - fame post while logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237f53dd2672cc1836f0b71/vote")
            .send({ voteType: "lame" })
            .set('x-access-token', jwtToken)
            .expect(200);
    })

    test("TC26 - fame post while not logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237f53dd2672cc1836f0b71/vote")
            .send({ voteType: "lame" });
        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

})

describe("Testing Delete Posts:", () => {
    test("TC27 - delete post while not logged in", async () => {
        const res = await requestCaller
            .delete("/posts/6237f53dd2672cc1836f0b71")
        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

    test("TC28 - delete owned post while logged in", async () => {
        const post = await requestCaller
            .post("/posts")
            .send({ title: 'test', content: "content", tag: "test" })
            .set('x-access-token', jwtToken);

        const id = post.body.result._id
        const res = await requestCaller
            .delete(`/posts/${id}`)
            .set('x-access-token', jwtToken)
            .expect(204);
    })

    test("TC29 - delete unowned post while logged in", async () => {
        const res = await requestCaller
            .delete(`/posts/6237f53dd2672cc1836f0b71`)
            .set('x-access-token', jwtToken)
            .expect(400);
    })
})

describe("Testing Update Posts:", () => {
    test("TC30 - edit post not logged in", async () => {
        const res = await requestCaller
            .patch("/posts/6237f53dd2672cc1836f0b71")
        expect(res.body.isLoggedIn).toEqual(false);
        expect(res.body.message).toEqual("Incorrect Token Given");
    })

    test("TC31 - edit owned while logged in", async () => {
        const post = await requestCaller
            .post("/posts")
            .send({ title: 'test', content: "content", tag: "test" })
            .set('x-access-token', jwtToken);

        const id = post.body.result._id
        const res = await requestCaller
            .patch(`/posts/${id}`)
            .send({
                update: {
                    content: "updated content"
                }
            })
            .set('x-access-token', jwtToken)
            .expect(200)

        expect(res.body.data.content).toEqual("updated content");

        await requestCaller.delete(`/posts/${id}`)
            .set('x-access-token', jwtToken);
    })

    test("TC32 - edit unowned post while logged in", async () => {
        const res = await requestCaller
            .delete(`/posts/6237f53dd2672cc1836f0b71`)
            .set('x-access-token', jwtToken)
            .expect(400);
    })
})

describe("Testing Get Posts by User", () => {
    test("TC33 - get post by user", async () => {
        const res = await requestCaller
            .get("/posts/user/datlam")
            .set('Accept', 'application/json')
        expect(res.header["content-type"]).toMatch(/json/);
        expect(res.status).toEqual(200);
        expect(res.body[0].creator).toEqual("datlam");
    })

    test("TC34 - get post by user without username", async () => {
        const res = await requestCaller
            .get("/posts/user/ ")
            .set('Accept', 'application/json')
            .expect(404)
    })
})