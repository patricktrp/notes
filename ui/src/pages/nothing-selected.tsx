import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const NothingSelected = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div>New Note</div>
      <NavLink to="/notes/10">
        <Button>Hi</Button>
      </NavLink>
    </div>
  );
};

export default NothingSelected;
