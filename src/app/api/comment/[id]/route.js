import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Comment from "@/models/Comment";
import { JsonWebTokenError } from "jsonwebtoken";

export async function GET(req,ctx){
    await db.connect();

    // blog id 
    const id = ctx.params.id;

    try {
        const comments = await Comment.find({blogId: id}).populate("authorId");
        return new Response(JSON.stringify(comments), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500});
    }
}

export async function DELETE(req ,ctx){
    await db.connect();
    const id = ctx.params.id; 
    const acceseToken = req.headers.get("authorization");
    const token = acceseToken.split(" ")[1];
    const decodedToken = verifyJwtToken(token);

    if(!acceseToken || decodedToken){
        return new Response(JSON.stringify({err: "unauthorized (wrong or expire token)"}), {status: 404});
    }

    try {
        const comment = await Comment.findById(id).populate("authorId")
        if(comment.authorId._id.toString() !== decodedToken._id.toString()){
            return new Response(JSON.stringify({msg: "only author can delete hid comment"}), {status:500});
        }

        await Comment.findByIdAndDelete(id);
        return new Response(JSON.stringify({msg: "sucessfully deleted comment"}), {status: 200});
    } catch (error) {
    return new Response(JSON.stringify(null), {status: 500}) ;
    }
}