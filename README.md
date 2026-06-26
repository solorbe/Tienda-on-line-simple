
## Guía de uso

### Catálogo de productos (`index.html`)

1. Al ingresar se muestra el listado completo de jeans disponibles.
2. Usá los botones de filtro (XS, S, M, L, XL, Todos) para ver solo los productos en ese talle.
3. Hacé clic en **Agregar al carrito** en cualquier producto:
   - Si el producto tiene talles, se abrirá un diálogo para que selecciones el talle deseado.
   - Si el producto no tiene stock, se mostrará un aviso de sin disponibilidad.
4. Confirmá con **Agregar** para sumarlo al carrito.

### Navegación general

- El **logo Violeta** en la barra de navegación permite volver a la página principal desde cualquier pantalla.
- El **ícono de bolsa** lleva al carrito de compras.

### Carrito de compras (`carrito.html`)

Accedé haciendo clic en el ícono de bolsa en la barra de navegación.

- Cada producto muestra imagen, descripción, talle, cantidad y precio parcial.
- Usá los botones **−** y **+** para modificar la cantidad de cada ítem.
  - Si la cantidad llega a 0 con **−**, el producto se elimina automáticamente.
- Usá el ícono 🗑 para eliminar un producto individual (pide confirmación).
- El **Total** se actualiza automáticamente.

#### Botones principales

| Botón | Acción |
|---|---|
| **Comprar** | Muestra confirmación de compra exitosa. Al aceptar, vacía el carrito. |
| **Eliminar todo** | Pide confirmación (Sí/No). Si confirmás, elimina todos los productos del carrito. |

> Ambos botones se deshabilitan automáticamente cuando el carrito está vacío.

## Persistencia

El carrito se guarda en el `localStorage` del navegador, por lo que los productos se mantienen aunque se cierre o recargue la página.