import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function CheckoutPage () {
  const formik = useFormik({
    initialValues: {
      companyName: '',
      NIF: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      postalCode: ''
    },
    validationSchema: Yup.object({
        companyName: Yup.string()
            .max(20, 'Debe tener 20 caracteres como máximo')
            .required('Required'),
        NIF: Yup.string()
            .max(10, 'Debe tener 10 caracteres como máximo')
            .required('Required'),
        phone: Yup.number()
            .max(999999999, 'Formato de teléfono no válido')
            .min(600000000, 'Formato de teléfono no válido'),
        email: Yup.string()
            .email('Formato de correo electrónico no válido')
            .required('Required'),
        address: Yup.string()
            .max(50, 'Formato de dirección no válido')
            .required('Required'),
        city: Yup.string()
            .max(50, 'Formato de ciudad no válido')
            .required('Required'),
        postalCode: Yup.number()
            .max(52080, 'Formato de código postal no válido')
            .min(1001, 'Formato de código postal no válido')
            .required('Required')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      console.log("Hacer document.getElementById(\"input_1_2\").value = ... en https://www.billin.net/generador-facturas/");
    }
  });

  return (
    <div>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>Página de check-out</h1>
            <p>El importe restante a pagar es de <b>128,90 €</b>. Si desea obtener una factura, rellene el siguiente formulario y podrá verla, así como recibirla por correo electrónico.</p>

        </div>
    
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-start"}}>
            <div style={{display: "block"}}>
                <h2>Datos del hotel</h2>
                <p>Nombre: Hotel Concierge</p>
                <p>NIF: B68596854</p>
                <p>Teléfono: 911111111</p>
                <p>Email: info@hotelconcierge.es</p>
                <p>Dirección: Calle Hotel, 1</p>
                <p>Población: Madrid</p>
                <p>Código Postal: 28040</p>

            </div>
            <div style={{display: "block"}}>
                <h2>Datos del cliente</h2>
                    <form onSubmit={formik.handleSubmit} >
                    <div>
                        <p><label style={{paddingRight: "7px"}} htmlFor="companyName">Nombre empresa o comercial<sup style={{color: "red"}}>*</sup></label>
                        <input style={{width: "100%"}}
                            id="companyName"
                            name="companyName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.companyName}
                        /></p>
                        {
                            formik.touched.companyName && formik.errors.companyName ? (
                            <div>{formik.errors.companyName}</div>
                            ) : null
                        }
                    </div>
                    
                    <div>
                    <p><label style={{paddingRight: "7px"}} htmlFor="NIF">NIF<sup style={{color: "red"}}>*</sup></label>
                    <input style={{width: "100%"}}
                        id="NIF"
                        name="NIF"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.NIF}
                    /></p>
                    {
                        formik.touched.NIF && formik.errors.NIF ? (
                        <div>{formik.errors.NIF}</div>
                        ) : null
                    }
                    </div>
                    
                    <div>

                    <p><label  style={{paddingRight: "7px"}}  htmlFor="phone">Teléfono</label>
                    <input style={{width: "100%"}}
                        id="phone"
                        name="phone"
                        type="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    /></p>
                    {
                        formik.touched.phone && formik.errors.phone ? (
                        <div>{formik.errors.phone}</div>
                        ) : null
                    }
                    </div>
                    
                    <div>

                    <p><label  style={{paddingRight: "7px"}}  htmlFor="email">Email<sup style={{color: "red"}}>*</sup></label>
                    <input style={{width: "100%"}}
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    /></p>
                    {
                        formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                        ) : null
                    }
                    </div>
                    
                    <div>

                    <p><label  style={{paddingRight: "7px"}}  htmlFor="address">Dirección<sup style={{color: "red"}}>*</sup></label>
                    <input style={{width: "100%"}}
                        id="address"
                        name="address"
                        type="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                    /></p>
                    {
                        formik.touched.address && formik.errors.address ? (
                        <div>{formik.errors.address}</div>
                        ) : null
                    }
                    </div>
                    
                    <div>

                    <p><label  style={{paddingRight: "7px"}}  htmlFor="city">Población<sup style={{color: "red"}}>*</sup></label>
                    <input style={{width: "100%"}}
                        id="city"
                        name="city"
                        type="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                    /></p>
                    {
                        formik.touched.city && formik.errors.city ? (
                        <div>{formik.errors.city}</div>
                        ) : null
                    }
                    </div>
                    
                    <div>

                    <p><label  style={{paddingRight: "7px"}}  htmlFor="postalCode">Código Postal<sup style={{color: "red"}}>*</sup></label>
                    <input style={{width: "100%"}}
                        id="postalCode"
                        name="postalCode"
                        type="postalCode"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.postalCode}
                    /></p>
                    {
                        formik.touched.postalCode && formik.errors.postalCode ? (
                        <div>{formik.errors.postalCode}</div>
                        ) : null
                    }
                    </div>
                    <button type="submit">Generar factura</button>
                    </form>
            </div>
        </div>

      
    </div>
  );
};