const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Require to use CORS
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:8081"
};

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});
app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
app.use(cors(corsOptions));

/* Agrega un nuevo endpoint GET en tu server.js que regrese todos los explorers. Prúebalo en la url: localhost:3000/explorers */
app.get('/explorers', async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
});

/* Agrega un nuevo endpoint GET que te regrese el explorer al enviar un ID por query params. Prúebalo en la url: localhost:3000/explorers/1 */
app.get('/explorers/:id', async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});

/* Crea un nuevo endpoint POST con el que vas a poder crear nuevos explorers. */
app.post('/explorers', async (req, res) => {
    try{
        const explorer = {
          name: req.body.name,
          username: req.body.username,
          mission: req.body.mission
         };
        const message = 'Explorer creado.';
        await prisma.explorer.create({data: explorer});
        return res.json({message});
    } catch (error) {
        console.error(error);
    }
});

/* Crea un nuevo endpoint PUT, en el cuál recibirás el ID del explorer a actualizar, y en el cuerpo del request los campos a actualizar, para este caso solo haremos el update del campo mission. */
app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

/* Crea un nuevo endpoint DELETE para eliminar un explorer dado un ID por query params. */
app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});


// User Table CRUD
app.get('/users', async(req, res) => {
    const allUser =  await prisma.user.findMany({});
    res.status(200).json(allUser);
});

app.get('/users/:id', async(req, res) => {
    const id = req.params.id;
    const user = await prisma.user.findUnique({where: {id: parseInt(id)}});
    if(user === null){
        res.status(200).json({userID: "Not found"})
    } else{
        res.status(200).json(user);
    }
});
app.post('/users', async(req, res) => {
    try{
        const user = {
          name: req.body.name,
          lang: req.body.lang,
          missionCommander: req.body.missionCommander,
          enrollments: req.body.enrollments
        };
        const message = 'User creado.';
        await prisma.user.create({data: user});
        return res.json({message});
    } catch (error) {
        console.error(error);
    }
});
app.put('/users/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            missionCommander: req.body.missionCommander
        }
    });
    return res.status(200).json({update: 'resource updated successfully'});
});
app.delete('/users/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    await prisma.user.delete({
        where: {
            id: id
        }
    });
    return res.status(200).json({delete: 'resource deleted successfully'});
});

//Mission commander Table CRUD
app.get('/missionCommanders', async(req, res) => {
    const allMissionCommanders = await prisma.missionCommander.findMany({});
    res.status(200).json(allMissionCommanders);
});
app.get('/missionCommanders/:id', async(req, res) => {
    const id = req.params.id;
    const missionCommander = await prisma.missionCommander.findUnique({where: {id: parseInt(id)}});
    if(missionCommander === null){
        res.status(200).json({missionCommanderID: "Not found"})
    } else{
        res.status(200).json(missionCommander);
    }
});
app.post('/missionCommanders', async(req, res) => {
    try{
        const missionCommander = {
            name: req.body.name,
            username: req.body.username,
            mainStack: req.body.mainStack,
            currentEnrollment: req.body.currentEnrollment,
            hasAzureCertification: req.body.hasAzureCertification
         };
        const message = 'Mission commander created.';
        await prisma.missionCommander.create({data: missionCommander});
        return res.json({message});
    } catch (error) {
        console.error(error);
    }
});
app.put('/missionCommanders/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    await prisma.missionCommander.update({
        where: {
            id: id
        },
        data: {
            mainStack: req.body.mainStack
        }
    });
    return res.status(200).json({update: 'resource updated successfully'});
});
app.delete('/missionCommanders/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    await prisma.missionCommander.delete({
        where: {
            id: id
        }
    });
    return res.status(200).json({delete: 'resource deleted successfully'});
});

