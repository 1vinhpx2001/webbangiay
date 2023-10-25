import React from 'react'
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingCard() {
    return (
        <div>
            <Card className="w-[280px] h-[400px] space-y-5 p-4" radius="lg">
                <Skeleton className="rounded-lg">
                    <div className="h-[240px] w-[240px] rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>
            </Card>
        </div>
    )
}
