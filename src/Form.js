import { useEffect, useState } from "react"
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import axios from "axios";
import Kullanici from "./kullanicilar";
const MyForm = (props) => {

    const bosData = {
        name: "",
        email: "",
        password: "",
        termAccept: false
    }

    const [uye, setUye] = useState(bosData)
    const [uyeErrors, setUyeErrors] = useState(bosData);
    const [valid, setValid] = useState(false);

    const uyeFormSchema = Yup.object().shape({
        name: Yup.string().required("Ürün ismi boş bırakılamaz!").min(5, "İsim Soyisim minimum 5 karakter olmalı!"),
        email: Yup.string().required("Email boş bırakılamaz!").email("Geçerli bir email giriniz."),
        password: Yup.string().required("Geçerli bir şifre giriniz!").min(8, "Şifre en az 8 karakter olmalıdır!"),
        termAccept: Yup.boolean().oneOf([true], "Koşullar ve şartlar kabul edilmelidir.")
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        Yup.reach(uyeFormSchema, name)
            .validate(value)
            .then((valid) => {
                setUyeErrors({ ...uyeErrors, [name]: "" });
            })
            .catch((err) => {
                setUyeErrors({ ...uyeErrors, [name]: err.errors[0] });
            });

            if(name == "email" && value == "waffle@syrup.com"){
                setUyeErrors({ ...uyeErrors, [name]: "Bu Email adresi zaten kayıtlı!" });
            }

        setUye({ ...uye, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", uye)
        .then((res) => {
            console.log(res)
            setUye({...res.data});
        })
    }

    const inputCheckboxHandler = (e) => {
        const { checked } = e.target;
        uye.termAccept = checked;
        setUye({...uye});
    };

    useEffect(() => {
        uyeFormSchema.isValid(uye).then((vld) => setValid(vld));
    }, [uye]);

    return (
        <Form>
            <FormGroup>
                <Label for="name">
                    Name
                </Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="İsim-Soyisim giriniz.."
                    type="text"
                    value={uye.name}
                    onChange={handleChange}
                    invalid={!!uyeErrors.name}
                />
                <FormFeedback>{uyeErrors.name}</FormFeedback>
            </FormGroup>

            <FormGroup>
                <Label for="email">
                    Email
                </Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="Email giriniz.."
                    type="email"
                    value={uye.email}
                    onChange={handleChange}
                    invalid={!!uyeErrors.email}
                />
                <FormFeedback>{uyeErrors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password">
                    Password
                </Label>
                <Input
                    id="password"
                    name="password"
                    placeholder="Şifre giriniz.."
                    type="password"
                    value={uye.password}
                    onChange={handleChange}
                    invalid={!!uyeErrors.password}
                />
                <FormFeedback>{uyeErrors.password}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Input
                    id="termAccept"
                    type="checkbox"
                    name="termAccept"
                    value={uye.termAccept}
                    onChange={inputCheckboxHandler}
                />
                <Label style={{ "marginLeft": "10px" }}>
                    Koşulları kabul ediyorum.
                </Label>
            </FormGroup>
            <Button name="submit" onClick={handleSubmit} disabled={!valid}>
                Gönder
            </Button>

            <Kullanici kullanici={uye} valid={valid} />

        </Form>
    )
}
export default MyForm;