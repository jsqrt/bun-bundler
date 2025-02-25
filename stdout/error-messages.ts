const modules = {
	root: {
		name: 'Bun-Bundler',
	},
	bundler: {
		name: 'Bundler',
	},
	server: {
		name: 'Server Module',
	},
	imageProcessor: {
		name: 'Image Processor',
	},
	spriteBuilder: {
		name: 'Sprite Builder',
	},
};

export const errorMessages = {
	'config-prop-not-def': '$0 is not defined',
};

// replace from string $1, $2, $3 etc. with replacers
const replacePlaceholders = (message: string, replacers: string[]) => {
	return replacers.reduce((acc, replacer, index) => {
		return acc?.replace(`$${index}`, replacer);
	}, message);
};

// const getTrace = (declarativeTrace) => {
// 	if (!declarativeTrace.length) return modules.root.name;
// 	const trace = declarativeTrace.split('.');
// 	const traceString = trace.map((key) => modules[key].name).join(' > ');
// 	return traceString;
// };

const getErrorMessage = (string, replacers) => {
	return replacePlaceholders(string, replacers);
};

const createError = ({ message, code }) => {
	return new Error(message, {
		cause: {
			message,
			code,
		},
	});
};

const proccessErrorSchema = (messages) => {
	return Object.fromEntries(
		Object.entries(messages).map(([code, typeMessage]) => {
			return [
				code,
				(replacers) => {
					return createError({
						message: getErrorMessage(typeMessage, replacers),
						code,
					});
				},
			];
		}),
	);
};

export const definedErrors = proccessErrorSchema(errorMessages);
