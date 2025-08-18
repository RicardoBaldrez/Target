# Target App

## Configuração de Linting e Formatação

Este projeto está configurado com ESLint e Prettier para manter a qualidade e consistência do código.

### Comandos Disponíveis

- `npm run lint` - Verifica problemas de linting
- `npm run lint:fix` - Corrige automaticamente problemas de linting
- `npm run format` - Formata todos os arquivos com Prettier
- `npm run format:check` - Verifica se os arquivos estão formatados corretamente

### Configurações Automáticas

O projeto está configurado para:

1. **Linha final vazia**: Todos os arquivos devem terminar com uma linha vazia
2. **Indentação correta**: 2 espaços para indentação
3. **Ordenação de imports**: Imports organizados por grupos e ordem alfabética
4. **Formatação automática**: Ao salvar arquivos no VS Code

### Regras Principais

- **eol-last**: Sempre uma linha vazia no final do arquivo
- **import/order**: Imports organizados por grupos (builtin, external, internal, etc.)
- **sort-imports**: Membros dos imports em ordem alfabética
- **react-native/no-inline-styles**: Evitar estilos inline
- **react-native/no-color-literals**: Usar constantes de cores do tema

### VS Code

Certifique-se de ter as seguintes extensões instaladas:

- ESLint
- Prettier - Code formatter

As configurações do VS Code estão em `.vscode/settings.json` e incluem:

- Formatação automática ao salvar
- Correção automática do ESLint ao salvar
- Inserção automática de linha final
- Remoção de espaços em branco no final das linhas
