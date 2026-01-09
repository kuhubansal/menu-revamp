import request from "supertest";
import app from "../index";
import { runQuery } from "../db/postgres";

jest.mock("../db/postgres");

jest.mock("../middlewares/authmiddleware", () => ({
  authenticateUser: (req, res, next) => next(),
}));

describe("Menu Routes",()=>{
    it("should return paginated menus", async () =>{
        (runQuery as jest.Mock).mockResolvedValueOnce({
            rows: [{menuid:1, menuname: "Test Menu", menucode:"TST"}],
        }).mockResolvedValueOnce({rows:[{count:1}]});
        const res = await request(app).get("/api/menus?page=1&limit=10");
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
    it("should search menus by query", async ()=>{
        (runQuery as jest.Mock).mockResolvedValueOnce({
            rows:[{menuid:2, menuname:"Testmenu2" , menucode:"TST2"}],
        });
        const res = await request(app).get("/api/menus/search?q=Testmenu2");
        expect(res.status).toBe(200);
    });
    it("should create the menu", async ()=>{
        (runQuery as jest.Mock).mockResolvedValueOnce({
            rows:[{menuid:3, menuname:"New menu" , menucode:"NEW01"}],
        });
        const res = await request(app).post("/api/menus").send({
            menuid: 3,
            menuname: "New menu",
            menucode: "NEW01",
            parentmenuid: 1
           // menuownerid: "Kuhu"
        });
        expect(res.status).toBe(200);
    });
    it("should update the menu", async ()=>{
        (runQuery as jest.Mock).mockResolvedValueOnce({
            rows:[{menuid:1 , menuname: "Updated menu", menucode:"UPD01" }]
        });
        const res = await request(app).patch("/api/menus/1").send({
            menuname: "Updated menu"
        });
        expect((res.status)).toBe(200);
    })
     it("should delete a menu", async ()=>{
        (runQuery as jest.Mock).mockResolvedValueOnce({rowcount:1});
        const res = await request(app).delete("/api/menus/1");
        expect((res.status)).toBe(200);
    })
    it("should return menu tree structure", async () => {
    (runQuery as jest.Mock).mockResolvedValueOnce({
      rows: [
        { menuid: 1, menuname: "Parent", parentmenuid: null },
        { menuid: 2, menuname: "Child", parentmenuid: 1 },
      ],
    });
    const res = await request(app).get("/api/menus/tree");
    expect(res.status).toBe(200);
  });
  });
