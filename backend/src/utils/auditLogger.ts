import {runQuery} from "../db/postgres";

export async function logMenuAction(menuid: number , action : string , user : any ,details : any ={} ){
   try {
    await runQuery(
        `INSERT INTO bc_menu_audit(menuid , action , performed_by , details)
        VALUES ($1 , $2 ,$3 , $4)`,
        [menuid , action , user?.username || "Unknown", details ]
    );
   } catch (err){
    console.error("Failed to log audit action: ", (err as any).message);
   }
}