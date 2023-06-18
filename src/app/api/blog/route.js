import db from "@/lib/db";
import { verifyJwtToken} from "@/lib/jwt";
import Blog from "@/models/Blog";

export async function GET(req){
    await db.connect();

    try {
        const blogs = await Blog.find({}).limit(16).populate("authorId");
        return new Response(JSON.stringify(blogs), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify(null), {status : 500});
    }
}

export async function POST(req){
    await db.connect();

    const acceseToken = req.headers.get("authorization");
    const token = acceseToken.split(' ')[1];
    const decodedToken = verifyJwtToken(token);
    if(!acceseToken || !decodedToken ){
        return new Response(JSON.stringify({error: "unauthorized (wrong or expire token)"}), {status: 403});
    }

    try {
        const body = await req.json();
        const newBlog = await Blog.create(body);
        return new Response(JSON.stringify(newBlog), {status: 201});
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500});
    }
}