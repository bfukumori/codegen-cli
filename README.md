# Codegen CLI

A command-line tool to generate an initial skeleton for a project with specified components and layers.

## Installation

You can install the package globally using npm:

```bash
npm install -g @bfukumori/codegen
```

## Usage

### Command

```bash
skeleton

# You can use --help flag for more information
```

### Options

- `--component-name`, `-c`: The name(s) of the component(s) to generate. This option is required and accepts multiple values.
- `--default-folder`, `-f`: The default folder where the project skeleton will be generated. The default value is `src`.

## Directory Structure

```bash
skeleton -c product -c person -c colors
```

The generated directory and file structure will be similar to:

```plaintext
.
├── src
│   ├── factory
│   │   ├── productFactory.js
│   │   ├── personFactory.js
│   │   └── colorsFactory.js
│   ├── repository
│   │   ├── productRepository.js
│   │   ├── personRepository.js
│   │   └── colorsRepository.js
│   └── service
│       ├── productService.js
│       ├── personService.js
│       └── colorsService.js
```
