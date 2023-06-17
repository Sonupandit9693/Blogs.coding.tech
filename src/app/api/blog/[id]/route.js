import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";
import User from "@/models/User";

// Read blog
export async function GET(req, ctx){
    await db.connect();

    const id = ctx.params.id ;
    try {
        const blog = await Blog.findById(id).populate("authorId").select('-password');
        return new Response(JSON.stringify(blog), {status : 200});
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500});
    }
}

// Update Blog
export async function PUT(req ,ctx){
    await db.connect();
    const id = ctx.params.id ;
    const accessToken = req.headers.get("authorization");
    const token = accessToken.split(' ')[1];

    const decodedToken = verifyJwtToken(token);

    if(!accessToken || ! decodedToken){
        return Response(JSON.stringify({error: "unauthorized (wrong or expired token)"}), {status: 403});
    }

    try {
        const body = await req.json();
        const blog = await Blog.findById(id).populate("authorId");
        if(blog?.authorId?._id.toString() !== decodedToken._id.toString()){
            return new Response(JSON.stringify({msg: "only author can update his blog"}), {status: 403});
        }

        const updateBlog = await Blog.findByIdAndUpdate(id, {$set: {...body}}, {new :true});
        return new Response(JSON.stringify(updateBlog), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 5000});
    }

}


// Delete Blog
export async function DELETE(req, ctx){
    await db.connect();
    const id = ctx.params.id;

    const accessToken = req.headers.get('authorization');
    const token = accessToken.split(' ')[1];

    const decodedtoken = verifyJwtToken(token);
    if(!accessToken || !decodedtoken){
        return new Response(JSON.stringify({error: "unauthorized (wrong or expire token)"}), {status:403});
    }

    try {
        const blog = await Blog.findById(id).populate("authorId")
        if(blog?.authorId?._id?.toString() !== decodedtoken?._id?.toString()){
            return new Response(JSON.stringify({msg: "only author can delete his Blog"}), {status:403});
        }

        await Blog.findByIdAndDelete(id);
        return new Response(JSON.stringify({msg: "sucessfully deleted Blog"}), {status :200});
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 5000});
    }
}