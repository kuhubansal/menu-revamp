import logger from "../utils/logger";
export class MenuNode {
    
    menuId: number;
    menuName: string;
    menuCode: string;
    parentMenuId: number;
    menuOwnerId?: string;
    children: MenuNode[] = [];

    constructor(menuId: number, menuName: string, menuCode: string, parentMenuId: number, menuOwnerId?: string) {
        this.menuId = menuId;
        this.menuName = menuName;
        this.menuCode = menuCode;
        this.parentMenuId = parentMenuId;
        this.menuOwnerId = menuOwnerId;
    }

}

export function buildMenu(flatMenus: any): MenuNode[]{
    
    const menuMap : Record<number, MenuNode> ={};
    const menuTree : MenuNode[] = [];
   
    flatMenus.forEach(flatMenu=>{
        const menu: MenuNode = new MenuNode(flatMenu.menuid, flatMenu.menuname, flatMenu.menucode, flatMenu.parentmenuid, flatMenu.menuownerid);
        menuMap[menu.menuId] = menu;
        logger.info("***********************************************************************");
        logger.info("Adding menu: ", menu.menuName, " in the map");
        const currentMenuHasAnyParent: boolean = menuMap[menu.parentMenuId] ? true : false;
        logger.info("Does menu:", menu.menuName, "has parent ->", currentMenuHasAnyParent);
        if(currentMenuHasAnyParent){
            const parentMenu = menuMap[menu.parentMenuId];
            logger.info("Parent menu for: ", menu.menuName, " is ", parentMenu.menuName);
            parentMenu.children.push(menu);
            logger.info("Pushing menu: ", menu.menuName, " inside ", parentMenu.menuName);
        }
        else{
            logger.info("Creating root menu with name: ", menu.menuName);
            menuTree.push(menu);
        }
    }); 
    return menuTree;
}