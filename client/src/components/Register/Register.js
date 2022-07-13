import Input from "../Input/Input";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

const Register = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <form>
      <Input type="text" name="name" text="Name" />
      <Input type="text" name="email" text="Email" />
      <Input
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        text="Password"
        handleClick={handleClick}
        name="password"
      />
      <Input
        type={visible ? "text" : "password"}
        icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
        text="Confirm Password"
        handleClick={handleClick}
        name="password2"
      />
      <div className="login_btn">
        <button>register</button>
      </div>
    </form>
  );
};

export default Register;
