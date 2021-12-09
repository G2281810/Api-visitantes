const express = require('express');
const routes = express.Router();


//Petición GET //
routes.get('/', (req, res)=>{
    req.getConnection((error, conn)=>{
        if(error) res.status(500).send('Error de servidor');

        conn.query('SELECT * FROM visitantes', (err,rows)=>{
            if(err) res.status(404).send('Visitantes no encontrados');
            res.status(200);
            var result = Object.values(JSON.parse(JSON.stringify(rows))) // Perimite convertir los datos a un formato JSON
            res.json(result);
            console.log(result);
        })
    })
})


//Petición GET un solo usuario //
routes.get('/:idvisitante',(req,res)=>{

    req.getConnection((error, conn)=>{
        let gID = req.params.idvisitante;
        let qr = `select *from visitantes where idvisitante = ${gID}`;
            conn.query(qr,(err,result)=>{
                if(err){console.log(err);}
                    res.send({
                        message:'Mostrando un solo visitante',
                        data:result
                    });
            });
            
        });
    });



//Petición POST agregar un nuevo usuario//
routes.post('/',(req,res)=>{
    console.log(req.body,'createdata');
    req.getConnection((err, conn)=>{
        let nombrevis = req.body.nombrevis;
        let apellido1 = req.body.apellido1;
        let apellido2 = req.body.apellido2;
        let edad = req.body.edad;
        let telefono = req.body.telefono;
        let correo = req.body.correo;
        let pass = req.body.pass;

    let qr = `insert into visitantes(nombrevis,apellido1,apellido2,edad,telefono,correo,pass) 
                values('${nombrevis}','${apellido1}','${apellido2}','${edad}','${telefono}','${correo}', '${pass}')`;
    console.log(qr,'qr')
        conn.query(qr,(err,result)=>{
            if(err){console.log(err);}
            console.log(result,'result')
            res.send({
                message:'Visitante registrado',
            });
        });

    })

    
});

//Petición PUT actualizar un usuario
routes.put('/:idvisitante',(req,res)=>{
    req.getConnection((err, conn)=>{
        console.log(req.body,'updatedata');

        let gID = req.params.idvisitante;
        let nombrevis = req.body.nombrevis;
        let apellido1 = req.body.apellido1;
        let apellido2 = req.body.apellido2;
        let edad = req.body.edad;
        let telefono = req.body.telefono;
        let correo = req.body.correo;
        let pass = req.body.pass;

        let qr = `update visitantes set nombrevis='${nombrevis}',apellido1='${apellido1}',apellido2='${apellido2}',edad='${edad}',telefono='${telefono}',
                    correo='${correo}',pass='${pass}' where idvisitante=${gID}`;
        conn.query(qr,(err,result)=>{
            if(err){console.log(err);}
                res.send({
                    message: 'Visitante modificado'
                });
            });
        });
    });
    
//Petición DELETE //
routes.delete('/:idvisitante',(req,res)=>{
    req.getConnection((error, conn)=>{
        let qID = req.params.idvisitante;
        let qr = `delete from visitantes where idvisitante='${qID}' `;
            conn.query(qr,(err,result)=>{
                if(err){res.status(404).send("Error al elimianar visitante");}
                    res.send({
                        message: 'Usuario Eliminado'
                    });
            });
    });

});
    

module.exports = routes;