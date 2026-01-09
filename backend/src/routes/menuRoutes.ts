import { Router } from "express";
import { authenticateUser } from "../middlewares/authmiddleware";
import { validate } from "../middlewares/validate";
import { updateMenuSchema , menuIdParamSchema, createMenuSchema} from "../validation/menuValidation";
import {
  getAllMenus,
  createMenu,
  updateMenu,
  deletemenuid,
  getDBHealth,
  getMenuTree,
  searchMenus,
  getPaginatedMenus
} from "../Controllers/menuController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: Menu Management APIs
 */
/**
 * @swagger
 * /api/menus:
 *  get:
 *   summary: Retrieve all menus
 *   description: Retrieve a list of menus
 *   tags: [Menus]
 *   responses:
 *     200:
 *       description: A list of menus.
 *     401:
 *       description: Unauthorized access.
 *     500:
 *       description: Internal server error.
 */
// Routes mapping
router.get("/", authenticateUser,getAllMenus);
/**
 * @swagger
 * /api/menus/search:
 *   get:
 *     summary: Search menus
 *     description: Search menus by name or code.
 *     tags: [Menus]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search term (menu name or menu code)
 *     responses:
 *       200:
 *         description: Search results
 *       401:
 *         description: Unauthorized access
 */
router.get("/search", authenticateUser , searchMenus);
/**
 * @swagger
 * /api/menus/paginated:
 *   get:
 *     summary: Get paginated menus
 *     description: Retrieve a paginated list of menus.
 *     tags: [Menus]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Paginated list of menus
 *       401:
 *         description: Unauthorized access
 */
router.get("/", authenticateUser,getPaginatedMenus);
/**
 * @swagger
 * /api/menus:
 *   post:
 *     summary: Create a new menu
 *     description: Add a new menu entry.
 *     tags: [Menus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuId:
 *                 type: integer
 *               menuName:
 *                 type: string
 *               menuCode:
 *                 type: string
 *               parentMenuId:
 *                 type: integer
 *               menuOwnerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu created successfully
 *       400:
 *         description : Invalid input 
 *       401:
 *         description: Unauthorized access
 */
router.post("/", authenticateUser,validate(createMenuSchema, "body"),createMenu);
/**
 * @swagger
 * /api/menus/{menuId}:
 *   patch:
 *     summary: Update an existing menu
 *     description: Update menu details by menuId
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: menuid
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id of the menu to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuName:
 *                 type: string
 *               menuCode:
 *                 type: string
 *               parentMenuId:
 *                 type: integer
 *               menuOwnerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized access
 */
router.patch("/:menuid", validate(menuIdParamSchema, "params"),validate(updateMenuSchema, "body"),authenticateUser,updateMenu);
/**
 * @swagger
 * /api/menus/{menuId}:
 *   delete:
 *     summary: Delete menu 
 *     description: Delete a menu by its ID 
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name : menuid
 *         required: true
 *         schema:
 *           type : integer
 *         description: Id of the menu to delete
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 *       401:
 *         description: Unauthorized access
 */
router.delete("/:menuid",authenticateUser, deletemenuid);
/**
 * @swagger
 * /api/menus/dbHealth:
 *   get:
 *     summary: Database health check
 *     description: Verifies if the database connection is active.
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: Database is healthy
 *       500:
 *         description: Database connection failed
 */
router.get("/dbHealth",authenticateUser, getDBHealth);
/**
 * @swagger
 * /api/menus/tree:
 *   get:
 *     summary: Get menu tree
 *     description: Returns the hierarchical tree structure of menus.
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: Menu tree structure
 *       401:
 *         description: Unauthorized access
 */
router.get("/tree", authenticateUser, getMenuTree);

export default router;
