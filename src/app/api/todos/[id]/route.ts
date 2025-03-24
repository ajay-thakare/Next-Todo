import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, isCompleted } = body;
    const id = params.id;

    // Check if the todo belongs to the user
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo || todo.userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized or not found" },
        { status: 404 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        isCompleted,
      },
    });

    return NextResponse.json({ todo: updatedTodo });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = params.id;

    // Check if the todo belongs to the user
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo || todo.userId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized or not found" },
        { status: 404 }
      );
    }

    await prisma.todo.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
