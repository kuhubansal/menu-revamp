import { Request, Response } from "express";
import { checkDBHealth, runQuery } from "../db/postgres";
import { buildMenu } from "../utils/buildMenuTree";
import logger from "../utils/logger";


//build menu tree 
export const getMenuTree = async (_req: Request, res: Response) => {
  try {
    const result = await runQuery("SELECT * FROM bc_menu ORDER BY menuid ASC");
    const tree = buildMenu(result.rows);
    logger.info("Menu tree fetched successfully");
    res.json(tree[0]);
  } catch (error) {
    logger.error("message building menu tree:", error);
    res.status(500).json({ message: "Failed to build menu tree" });
  }
}

// Get all menus
export async function getAllMenus(_req: Request, res: Response) {
  try {
    const result = await runQuery("SELECT * FROM bc_menu ORDER BY menuid ASC");
    res.json(result.rows);
  } catch (error) {
    logger.error("message fetching menus:", error);
    res.status(500).json({ message: "Failed to fetch menus" });
  }
}

// Create a new menu
export async function createMenu(req: Request, res: Response) {
  try {
    const {menuid, menuname, menucode, parentmenuid} = req.body;
    const query: string = `INSERT INTO bc_menu (menuid, menuname, menucode, parentmenuid) VALUES (${menuid}, '${menuname}',' ${menucode}', ${parentmenuid}) RETURNING *`;
    const result = await runQuery(query);
    res.status(200).json({"Menu added succesfully in BC_MENU": result.rows[0]});
  } catch (error) {
    logger.error("message creating menu:", error);
    res.status(500).json({ message: "Failed to create menu" });
  }
}

// Update existing menu
export async function updateMenu(req: Request, res: Response) {
  try {
    const { menuid } = req.params;
    const { rows } = await runQuery("SELECT * FROM bc_menu WHERE menuid = $1 ;", [menuid]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Menu not found" });
      const existing = rows[0];
      const updated = {
      menuname: req.body.menuname ?? existing.menuname,
      menucode: req.body.menucode ?? existing.menucode,
      parentmenuid: req.body.parentmenuid ?? existing.parentmenuid,
      menuownerid: req.body.menuownerid ?? existing.menuownerid,
    };
    const result = await runQuery(
      `UPDATE bc_menu
       SET menuname = $1,
           menucode = $2,
           parentmenuid = $3,
           menuownerid = $4
       WHERE menuid = $5
       RETURNING *;`,
      [updated.menuname, updated.menucode, updated.parentmenuid, updated.menuownerid, menuid]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Menu not found after update" });

    res.status(200).json({
      message: "Menu updated successfully",
      updatedMenu: result.rows[0],
    });
  } catch (error: any) {
    logger.error("message updating menu:", error.message);
    res.status(500).json({ message: "Failed to update menu" });
}
}
0

// Delete a menu
export async function deletemenuid(req: Request, res: Response) {
  try {
    const {menuid} = req.params;
    const query: string = `DELETE FROM bc_menu WHERE menuid=${menuid}`;
    const result = await runQuery(query);
    logger.info( "Menu deleted successfully" );
    res.status(200).json({ message: "Deleted" }); 
  } catch (error) {
    logger.error("message deleting menu:", error);
    res.status(500).json({ message: "Failed to delete menu" });
  }
}

//search menus by name or code 
export async function searchMenus(req: Request , res : Response ){
  try {
    const {q} = req.query;
    const term =`%${q || ""}%`;
    const result = await runQuery(
      `SELECT * from bc_menu WHERE menuname ILIKE $1 OR menucode ILIKE $1 ORDER BY menuid ASC`,[term]
    );
    res.json({
      count : result.rows.length,
      results : result.rows,
    });
  } catch (error:any )
  {
    console.error("Error searching menus:" , error.message);
    res.status(500).json({error: "Failed to search menus"});
  }
}

//Get Pagination menus 
export async function getPaginatedMenus(req:Request, res:Response){
  try {
    const page = Number(req.query.page)||1;
    const limit = Number(req.query.limit)||10;
    const offset = (page -1)*limit;
    const data = await runQuery(`SELECT * FROM bc_menu ORDER BY menuid ASC LIMIT $1 OFFSET $2`, [limit , offset]);
    const count = await runQuery(`SELECT COUNT(*) FROM bc_menu`);
    res.json({
      page,
      limit,
      total : Number(count.rows[0].count),
      menus: data.rows,
    });
  }catch (error:any){
     console.error("Error fetching paginated menus:",error.message);
     res.status(500).json({error: "Failed to fetch paginated menus"})
  }
}


// Database health
export async function getDBHealth(_req: Request, res: Response) {
  const result = await checkDBHealth();
  res.json(result);
}
