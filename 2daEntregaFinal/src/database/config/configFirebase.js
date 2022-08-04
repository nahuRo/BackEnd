import admin from "firebase-admin";

const keyFirebase = {
	type: "service_account",
	project_id: "coderfinalp2",
	private_key_id: "701182a6e3b7975d2352e54b4858801c58d1a14d",
	private_key:
		"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDAIoPs6nkHJxrQ\nidfOwOzZuceN1P4JSO0LoAZP88vLbkqEgJZENExBbTeq2n1L9uJdovfLMtwbRSPY\nU4hVvPNIe7ojvyHYJIJTsgqCFQd+UXSqrrkOp0qQMigir/Di0Yvawlz6ioKNnOZq\nc2x8L5ciseb98DZ9JFvAX9Y7rLwrdnC115LN0cigeUc2Y9jrDieCbEKSEuEbI4FJ\njj3stQnM7n0Uhjy79h4Lss2UHxL+3a0IMqsB1Q/T5nFX+p+4vJZpmIL2dJwsLn/9\nZe1hCQWFT32ebIayEzSgdIR7pAY7lzGcNRUvlATO8mK8fKBaE/KNplXBu+fapz9f\nDFVzPrftAgMBAAECggEAC3BSneGExJf/qPA39LN4Nmsw1gEbAbcBg9pqXcq0NJ+T\nmKlmKNfbPV7w/D9HS+U+K1h3O7YCtC3s2SV5/a7C5isVlSi9LVbZGn4EUaPKXyse\n0MWXt2de0VBnIs+KPhq/Io5FRlZGOQOhFS/bgtY7f4GLcM1jFRa7zqt1//YD+utX\nFuIrsEOTC4zvf7YjnVXWL5Dq0ghTZbTuM4PnFwLPz1nJ/LSk99b5UGISEpoxLQvw\n6BnD5rBx/SnzQyCYjiImD6uQll9QHo+BOhRsOt2GrerkFGDwwJ3g+t7VT7/uXC9I\nf/hBD4LdIJgsmbiWVNvs6DFNsbsJ/yUWUfD4CTpXGQKBgQDi1azNvyEQNY23xzAj\nmWi7D81WL75Y4hr+z/bdWayAtbw7/hEG+vWy+ZG2bzS8VCMDM10P2zavktEyEbbX\ny6qTPxSZIYx4Fjwf+teC+e2ZI9h3jvbNd3e6Y7WHWdSaf/JRJHWyLeeeTX7O1BwO\nLlndH1TzaYWPsi6kkjQI4sR1ZQKBgQDY1q9/TNcM0ZqCpZnxSiMJHkECAaRWOYD6\ng9HlWFV130W3/h+sgw08N5WrL3YjeWXhQQh0dZvSZRMvbJdbr0ifCcy1foC81nnP\nsRb3QH6LCptjmtV90FtvKlZ9i36c6uyYNnrvetztcEpo/Pu9KpQHJxUtMmvNiqMO\nxEvkS23z6QKBgGCck3oaIrHtrUuN+fHfoBy0MUe5FAB1ZPwMhV9nlzJGtUJ0BrqL\nXuR4qVgjazmfOD5fvQ5I1rTW+mSx6MdmhmMqpdJG2LY4+ijAxNOTMWBdRRA/At0m\nOgdX+nQIjaW0QvfOaJaYOKNS7GSZMM3Vbg7hDmSSGAHI6VbMsn7qXrSFAoGASffS\nHgbERScrIe4DuX+ku/OKEXkl6hPrn4lgDHA5lt/3FHCntV1vIl+DusWR8z/yNQjO\nLYwA/6BjDwZoC2qbx0S8hB0HJWO0YdjzEJz7jcqsfynOMgDlb+JtZp4zLqwk0Tek\ncBTlUEnB2FaUOU9Q96+pVaWhiJgGT38+tD3W4CECgYBbUfAwGRlqeZQtFlaWtSMq\nV3vm4KmtlKHHCL6HD6s2X8wXph7u8xawaGxVP+LiBsAf5G4cI2e8FuoGEIasNlbE\nRX2cGPaF7qAgk4qH7fXt9ChFNta9itLMbo0UtKiFMOYu4LOsm4PONxTTbUk8FaFW\n4HVlfTAo1T+F7sku918i1Q==\n-----END PRIVATE KEY-----\n",
	client_email: "firebase-adminsdk-743ap@coderfinalp2.iam.gserviceaccount.com",
	client_id: "114639576414974792349",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-743ap%40coderfinalp2.iam.gserviceaccount.com",
};

// conectando/configurando para usar mi db en firebase
admin.initializeApp({
	credential: admin.credential.cert(keyFirebase),
});

// export const DBF = () => {
// 	console.log('conexion con Firebase')
// 	return admin.firestore();
// 	const prod = db.collection("products"); // como hace mongo, al no tener esta collection me la crea
// };

// ConnectionDBFiresbase();

export const db = admin.firestore();
