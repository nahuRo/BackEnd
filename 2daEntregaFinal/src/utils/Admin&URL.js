// para la autorizacion
export const isAdmin = (admin) => {
	return (req, res, next) => (admin ? next() : res.status(401).send("No sos Admin pa"));
};

// dar permiso
export const permiso = true; // <---- cambia el boolean
