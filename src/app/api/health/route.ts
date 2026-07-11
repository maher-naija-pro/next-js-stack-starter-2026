import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

// Used by the Dockerfile's HEALTHCHECK and by orchestrators (Compose, k8s,
// load balancers) to decide whether this instance should receive traffic.
// Checks the DB, not just "is the Node process alive" — a container can be
// "up" while unable to serve any real request if Postgres is unreachable.
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ status: 'error' }, { status: 503 });
  }
}
