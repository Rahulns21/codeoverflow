import { APIErrorResponse } from "@/app/types/global";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

// get users
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await dbConnect();

        if (!id || !isValidObjectId(id)) throw new NotFoundError('User');

        const user = await User.findById(id);
        if (!user) throw new NotFoundError('User');

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

// delete users
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await dbConnect();

        if (!id || !isValidObjectId(id)) throw new NotFoundError('User');

        const user = await User.findByIdAndDelete(id);
        if (!user) throw new NotFoundError('User');

        return NextResponse.json({ success: true, data: user}, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

// update users
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        await dbConnect();

        if (!id || !isValidObjectId(id)) throw new NotFoundError('User');
        const body = await request.json();
        const validatedData = UserSchema.partial().parse(body);

        const updatedUser = await User.findByIdAndUpdate(id, validatedData, { new: true });
        if (!updatedUser) throw new NotFoundError('User');

        return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}