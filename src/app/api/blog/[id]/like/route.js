import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";

export async function GET(req, ctx){
    await db.connect();
    const id = ctx.params.id; 
    const acceseToken = req.headers.get("authorization");
    const token = acceseToken.split(" ")[1];
    const decodedToken = verifyJwtToken(token);

    if(!acceseToken || decodedToken){
        return new Response(JSON.stringify({err: "unauthorized (wrong or expire token)"}), {status: 404});
    }
    try {
        const blog = await Blog.findById(id);
        if(blog.likes.includes(decodedToken._id)){
            blog.likes = blog.likes.filter((id)=> id.toString !== decodedToken._id.toString())
        }else{
            blog.likes.push(decodedToken._id);
        }

        await blog.save();
        return new Response(JSON.stringify({msg: "sucessfully interacted with the blog"}), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(null), {status:500});
    }
}