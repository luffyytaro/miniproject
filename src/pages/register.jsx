import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useFormik} from "formik";
import validate from "../validation/register.js";
import toast from "react-hot-toast";
import Input from "../components/input";
import Button from "../components/button.jsx"

export default function Register(){
   const navigate = useNavigate();
   const formik = useFormik({
    initialValues:{
        username:"",
        email:"",
        password:"",
        cpassword:"",
    },
    validate: validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit:(values) =>{
        console.log(values);
        let {cpassword, ...rest} = values;
        let res = axios.post("/api/register", rest);
        toast.promise(res,{
            loading:"registering",
            success:()=>{
                navigate("/login",{replace:true});
                return "registration completed"
            },
            error:"registration failed"
        });
    }
   });
    return(
        <main className="size-full bg-gradient-to-b from-green-400 to-blue-500 flex items-center justify-center">
            <section className="max-h-[30rem] h-full max-w-[25rem] w-full bg-white shadow-lg rounded-md">
                <h2 className="text-center p-8 text-2xl font-bold">SignUp to Adhigram</h2>
                <form onSubmit={formik.handleSubmit} className="flex items-center justify-center flex-col gap-2 w-full">
                    <Input type="text" placeholder="username"{...formik.getFieldProps("username")}/>
                    <article className="text-red-600 text-lg">
                        {formik.errors.username}
                    </article>
                    <Input type="email" placeholder="email"{...formik.getFieldProps("email")}/>
                    <article className="text-red-600 text-sm">
                        {formik.errors.email}
                    </article>
                    <Input type="password" placeholder="password"{...formik.getFieldProps("password")}/>
                    <Input type="password" placeholder="confirm password"{...formik.getFieldProps("cpassword")}/>
                    <article className="text-red-600 text-sm">
                        {formik.errors.password}
                    </article>
                    <Button>Register</Button>
                    <div className="w-5/6 h-0.5 bg-black"></div>
                    <article>Already have an account?<Link to={"/login"}>Login</Link></article>
                </form>
            </section>
        </main>
    );
}
