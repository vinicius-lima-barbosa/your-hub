Contexto:
Atue como um Arquiteto de Software Sênior. Vamos construir um dashboard minimalista de produtividade estilo "Lo-Fi Focus". O objetivo é criar uma aplicação web única (Single Page Application) performática, responsiva e esteticamente limpa.

Stack Tecnológica:

Framework: Next.js 15 (App Router).

Linguagem: TypeScript.

Estilização: Tailwind CSS (configurado com paleta Stone/Neutral).

Gerenciamento de Estado: Zustand (para o player de música e persistência leve).

Ícones: lucide-react.

Utilidades: clsx, tailwind-merge, date-fns.

Media: react-player (para streams de YouTube).

Diretrizes de Design (Minimalismo):

Tema: Paleta Muted. Dark: tons de carvão e cinza escuro (#121212). Light: off-white (#fcfcfc).

Layout:

Desktop: Layout grid ou flex 2 colunas. Coluna esquerda (30%): Aside com Bloco de Notas (textarea simples) e Pomodoro Timer. Coluna direita (70%): Área principal com Gerenciador de Eventos (countdown) e Player de Música minimalista.

Mobile: Layout vertical empilhado. O Aside vira um drawer ou abre abaixo da área principal.

Experiência: Nenhuma página de login. Todo o estado (notas, timer, configurações) deve ser persistido via localStorage com um hook customizado useLocalStorage.

Estrutura de Pastas Esperada:

```
/components/ui (botões, inputs, cards básicos)

/components/layout (Aside, MainContent)

/components/features (Player, Pomodoro, Notes, Countdown)

/store (Zustand store global para player e notas)

/hooks (hooks customizados)
```

Requisitos Funcionais:

Player: Deve persistir o estado de reprodução independentemente de interações no resto da página. Usar react-player apontando para um array de URLs de stream Lo-Fi.

Notas: Textarea que salva automaticamente (debounced) no localStorage.

Pomodoro: Timer simples com estados (foco/pausa) e sons de notificação opcionais.

Countdown: Input para data/evento que exibe o tempo restante.

Sua tarefa agora:

Gere o tailwind.config.ts com uma paleta de cores minimalista (Stone/Neutral).

Crie a estrutura de arquivos para o store (store/useAppStore.ts) definindo os estados iniciais.

Gere o componente base da página (app/page.tsx) com o layout responsivo configurado (Grid/Flex).

Forneça os comandos de instalação de todas as dependências necessárias de uma só vez.

Por que estruturei dessa forma?

Evita Poluição Visual: Ao definir o tailwind.config.ts logo no início, você garante que as cores que você quer (não roxo, tons sóbrios) já estejam pré-definidas no tema, evitando que você precise ajustar classe por classe depois.

Zustand vs. Context API: Sugeri Zustand porque, para um app de "Single Page", o Context API do React causaria renderizações desnecessárias em toda a árvore de componentes cada vez que o timer atualizasse ou a música mudasse. O Zustand é mais performático e muito mais simples de manter.

Foco na Persistência: Ao explicitar o useLocalStorage, você resolve o problema de "perda de dados" sem precisar de um backend complexo agora, cumprindo o requisito de simplicidade.

Dica de parceiro: Se você for rodar isso em algum ambiente (Vercel, por exemplo), a implementação do react-player dentro de um useEffect é crucial para evitar erros de hidratação (SSR vs Client-side) no Next.js. Se a IA que você usar para codar esquecer disso, me avise que eu te dou o snippet exato para tratar o isMounted.
