import DotBadge from "@/shared/ui/Content/DotBadge";
import IconBadge from "@/shared/ui/Content/IconBadge";
import NumberBadge from "@/shared/ui/Content/NumberBadge";
import TextBadge from "@/shared/ui/Content/TextBadge";
import { Icon, SquareDashed } from "lucide-react";

const testPage = () => {
    return (
        <div className='flex min-h-dvh flex-col items-center justify-center gap-5 rounded-md px-4 text-xl bg-base'>
            
            <TextBadge size="sm" variant="surface" peak={true} text="Label"><SquareDashed className="w-4 h-4" /></TextBadge>
            <TextBadge size="sm" variant="surface" peak={false} text="TextBadge"/>
            <TextBadge size="sm" variant="outline" peak={true} text="TextBadge"/>
            <TextBadge size="sm" variant="outline" peak={false} text="TextBadge"/>
            <TextBadge size="sm" variant="accent" peak={true} text="TextBadge"/>
            <TextBadge size="sm" variant="accent" peak={false} text="TextBadge"/>
            <TextBadge size="sm" variant="data" peak={true} text="TextBadge"/>
            <TextBadge size="sm" variant="data" peak={false} text="TextBadge"/>

            <NumberBadge size="sm" variant="surface" peak={true} number={10}/>
            <NumberBadge size="sm" variant="surface" peak={false} number={1}/>
            <NumberBadge size="sm" variant="outline" peak={true} number={1}/>
            <NumberBadge size="sm" variant="outline" peak={false} number={1}/>
            <NumberBadge size="sm" variant="accent" peak={true} number={1}/>
            <NumberBadge size="sm" variant="accent" peak={false} number={1}/>
            <NumberBadge size="sm" variant="data" peak={true} number={1}/>
            <NumberBadge size="sm" variant="data" peak={false} number={1}/>

            <IconBadge size="sm" variant="surface" peak={true} icon={<SquareDashed className="w-[11px] h-[11px]" />}/>
            <IconBadge size="md" variant="surface" peak={false} icon={<SquareDashed className="w-[12px] h-[12px]" />}/>
            <IconBadge size="md" variant="outline" peak={true} icon={<SquareDashed className="w-[12px] h-[12px]" />}/>
            <IconBadge size="md" variant="outline" peak={false} icon={<SquareDashed className="w-[12px] h-[12px]" />}/>
            <IconBadge size="md" variant="accent" peak={true} icon={<SquareDashed className="w-[12px] h-[12px]" />}/>
            <IconBadge size="lg" variant="accent" peak={false} icon={<SquareDashed className="w-[13px] h-[13px]" />}/>
            <IconBadge size="lg" variant="data" peak={true} icon={<SquareDashed className="w-[13px] h-[13px]" />}/>
            <IconBadge size="lg" variant="data" peak={false} icon={<SquareDashed className="w-[13px] h-[13px]" />}/>
        
            <DotBadge size="sm" variant="surface"/>
            <DotBadge size="sm" variant="accent"/>
            <DotBadge size="sm" variant="data"/>
            <DotBadge size="md" variant="surface"/>
            <DotBadge size="md" variant="accent"/>
            <DotBadge size="md" variant="data"/>
            <DotBadge size="lg" variant="surface"/>
            <DotBadge size="lg" variant="accent"/>
            <DotBadge size="lg" variant="data"/>
        
        </div>
      );
  };
  
export default testPage;