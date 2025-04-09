import * as yup from 'yup';

export const todoScheme = yup
	.object({
		title: yup.string().lowercase().trim().required('title boş geçilemez'),
		completed: yup.boolean(),
	})
	.required();
