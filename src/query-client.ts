import { QueryClient } from '@tanstack/react-query';

// 1. aşama
// uygulama genelinde bazen queryClient servisinden işlem yapmamız gerekiyor
// bu sebeple store gibi bir dosya oluşturup export ettik.
export const queryClient = new QueryClient();
