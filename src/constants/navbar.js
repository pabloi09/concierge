import React from "react"
import HomeIcon from '@material-ui/icons/Home';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import HotelIcon from '@material-ui/icons/Hotel';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import CreateIcon from '@material-ui/icons/Create';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const navbar = [
    [{
        "title": "Inicio",
        "icon": <HomeIcon/>,
        "path": "/"                         
    }],
    [{
        "title": "Perfil",
        "icon": <PermIdentityIcon/>,
        "path": "/perfil"                         
    },
    {
        "title": "Estancia",
        "icon": <HotelIcon/>,
        "path": "/estancia"                         
    },
    {
        "title": "S. Habitaciones",
        "icon": <FastfoodIcon/>,
        "path": "/servicio-habitaciones"                         
    },
    {
        "title": "Transporte",
        "icon": <LocalTaxiIcon/>,
        "path": "/transporte"                         
    },
    {
        "title": "Ocio",
        "icon": <ConfirmationNumberIcon/>,
        "path": "/ocio"                         
    },
    {
        "title": "Personalizada",
        "icon": <CreateIcon/>,
        "path": "/personalizada"                         
    }],
    [{
        "title": "Solicitudes",
        "icon": <DonutLargeIcon/>,
        "path": "/solicitudes"                         
    }],
    [{
        "title": "Log out",
        "icon": <ExitToAppIcon/>,
        "path": "/login"                         
    }]

    
    
]