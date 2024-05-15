import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useFormik } from "formik";
import validate from "../validation/login";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "../components/button";

export default function Login(){

    const navigate= useNavigate();
    const formik = useFormik({
        initialValues:{
            username:"",
            password:""
        },
        validate: validate,
        validateOnBlur: false,
        validateOnChange:false,
        onSubmit:(values) =>{
            console.log(values);
            let res = axios.post("/api/login", values);
            toast.promise(res,{
                loading:"Logging in...",
                success:(res)=>{
                    console.log(res);
                    localStorage.setItem("token", res.data.token);
                    navigate("/", { replace: true});
                    return "Login successful";
                },
                error: "Login failed!"
            })
        }
    })

    return(
        <main className="size-full bg-gradient-to-b from-blue-400 to-green-400  flex items-center justify-center">
            <section className="max-h-[30rem] h-full max-w-[25rem] w-full bg-white shadow-lg">
                <h2 className="text-center p-8 text-2xl font-bold">Login to Adhigram</h2>
                <form onSubmit={formik.handleSubmit} className="flex items-center justify-center flex-col gap-2 w-full">
                    <Input type="text" placeholder="username" {...formik.getFieldProps("username")}/>
                    <article className="text-red-600 text-lg">
                        {formik.errors.username}
                    </article>
                    <Input type="password" placeholder="password" {...formik.getFieldProps("password")}/>
                    <article className="text-red-600 text-lg">
                        {formik.errors.password}
                    </article>
                   <Button type="submit">Login</Button>
                   <div className="w-5/6 h-0.5 bg-black"></div>
                   <article>Do not have an account?<Link to={"/register"}>Signup</Link></article>
                </form>
            </section>

        </main>
    );
}