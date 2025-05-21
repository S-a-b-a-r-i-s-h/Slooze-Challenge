import { NextResponse } from 'next/server';
// import { dummyProducts } from '../route';
import { dummyProducts } from '@/constants';
interface RouteParams {
  params: Promise<Record<string, string>>;
}
export async function GET(_: Request, { params }: RouteParams ) {
  const { id: paramsId } = await params;

  const product = dummyProducts.find((p) => p.id === paramsId);
  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: RouteParams ) {
  const { id: paramsId } = await params;
  const updatedProduct = await req.json();
  const index = dummyProducts.findIndex((p) => p.id === paramsId);
  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  dummyProducts[index] = { ...dummyProducts[index], ...updatedProduct };
  return NextResponse.json({ message: 'Product updated', product: dummyProducts[index] });
}

export async function DELETE(_: Request, { params }: RouteParams ) {
  const { id: paramsId } = await params;
  const index = dummyProducts.findIndex((p) => p.id === paramsId);
  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  const deleted = dummyProducts.splice(index, 1);
  return NextResponse.json({ message: 'Product deleted', product: deleted[0] });
}
