"use client";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type Props = {
  item: {
    title: string;
    image: string;
    content: string;
  };
};
const SocialCard = ({ item }: Props) => {
  return (
    <Card className="flex h-[550px] transform flex-col items-center gap-2 border-none transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="relative h-[350px] w-full overflow-hidden rounded-t-lg">
        <Image
          src={item.image}
          fill
          alt={item.title}
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        <CardTitle className="absolute bottom-2 left-2 z-10 rounded bg-black/50 px-2 py-1 text-lg text-white">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground h-200 p-4 text-sm">
        {item.content}
      </CardContent>
    </Card>
  );
};
export default SocialCard;
