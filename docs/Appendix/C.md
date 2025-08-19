---
prev:
  text: '附录B：将 C++ 示例翻译为 Python'
  link: '/Appendix/B'
next:
  text: '附录D：下一步是什么？'
  link: '/Appendix/D'
---

## 附录C：PyQt6 和 PySide6 两者有何不同？

如果您开始使用Qt6构建Python应用程序，您应该很快就会发现，实际上您可以使用两个包来实现这一点——PyQt6和PySide6。

在本章中，我将详细解释为什么会出现这种情况，以及您是否需要关心这一点（剧透：您真的不需要关心），同时也会介绍（少数）差异以及如何绕过这些差异。到本章结束时，您应该能够自如地复用PyQt6和PySide6教程中的代码示例来构建您的应用程序，无论您自己使用的是哪个包。

## 背景

为什么有两个库？

PyQt 由 [Riverbank Computing Ltd.](https://www.riverbankcomputing.com/software/pyqt/intro) 的 Phil Thompson 开发，并已存在了很长时间，支持回溯至 2.x 版本的 Qt。在2009 年，当时拥有 Qt 工具包的诺基亚公司希望将 Qt 的 Python 绑定以更宽松的 LGPL 许可证形式提供。由于无法与 Riverbank 达成协议（Riverbank 因此会损失收入，这可以理解），他们随后发布了自己开发的绑定库 _PySide。

![information](information.png)

> 它被称为PySide，因为“side”在芬兰语中意为“粘合剂”。

这两个接口基本上是等效的，但随着时间的推移，PySide 的开发进度逐渐落后于 PyQt。这一差距在 Qt 5 发布后尤为明显——PyQt 的 Qt5 版本（PyQt5）自 2016 年中旬起便已可用，而 PySide2 的首个稳定版本则在两年后才发布。考虑到这一点，许多 Python 上的 Qt5 示例使用 PyQt5 就不足为奇了——仅仅是因为它已经可用。

然而，Qt 项目最近已将 PySide 作为官方的 [Qt for Python 发布版本](https://www.qt.io/qt-for-python)，这应能确保其未来的发展前景。当 Qt6 发布时，两个 Python 绑定版本均在短时间内同步推出。

|              | PyQt6                    | PySide6  |
| ------------ | ------------------------ | -------- |
| 首个稳定版本 | 2021.1                   | 2020.12  |
| 开发者       | Riverbank Computing Ltd. | Qt       |
| 许可证       | GPL 许可证或商业许可证   | LGPL     |
| 平台         | Python 3                 | Python 3 |

您应该使用哪一个？坦白说，其实并没有太大区别。

这两个包都封装了同一个库——Qt6——因此它们的API有99.9%是相同的（见下文的少量差异）。您使用其中一个库学到的任何内容都可轻松应用于使用另一个库的项目。此外，无论您选择使用哪个库，都值得熟悉另一个库，以便您能够充分利用所有可用的在线资源——例如，使用 PyQt6 教程来构建您的 PySide6 应用程序，反之亦然。

在本短章中，我将简要介绍这两个包之间的几个显著差异，并解释如何编写能够与两者无缝兼容的代码。阅读本章后，您应该能够将任何在线的 PyQt6 示例转换为与 PySide6 兼容的代码。

## 许可证

两个版本之间的主要区别在于许可协议——PyQt6可通过GPL或商业许可协议获取，而PySide6则采用LGPL许可协议。

如果您计划将您的软件本身在GPL许可证下发布，或者您正在开发不会分发的软件，PyQt6的GPL要求很可能不会成为问题。然而，如果您希望分发您的软件但不分享源代码，您需要从Riverbank购买PyQt6的商业许可证或使用PySide6。

![information](information.png)

> Qt本身可通过Qt商业许可证、GPL 2.0、GPL3.0和LGPL 3.0许可证获取。

## 命名空间和枚举

PyQt6 引入的一项重大变更之一是需要使用完全限定名来引用枚举和标志。此前，在 PyQt5 和 PySide2 中，您可以使用快捷方式——例如 `Qt.DecorationRole`、`Qt.AlignLeft`。在 PyQt6 中，这些现在分别是 `Qt.ItemDataRole.DisplayRole` 和 `Qt.Alignment.AlignLeft`。这一变更影响了 Qt 中所有枚举类型和标志组。在 PySide6 中，长名称和短名称均继续支持。

## UI 文件

这两个库之间的另一个主要区别在于它们对从 Qt Creator/Designer 导出的 `.ui` 文件的加载方式。PyQt6 提供了 uic 子模块，可用于直接加载 UI 文件以生成对象。这看起来非常符合 Python 的风格（如果忽略驼峰式命名法的话）。

```python
import sys
from PyQt6 import QtWidgets, uic

app = QtWidgets.QApplication(sys.argv)

window = uic.loadUi("mainwindow.ui")
window.show()
app.exec()
```

使用 PySide6 时，代码会多出一行，因为您需要先创建一个`QUILoader` 对象。不幸的是，这两个接口的 API 也有所不同（`.load` 与 `.loadUI`）。

```python
import sys
from PySide6 import QtCore, QtGui, QtWidgets
from PySide6.QtUiTools import QUiLoader

loader = QUiLoader()

app = QtWidgets.QApplication(sys.argv)
window = loader.load("mainwindow.ui", None)
window.show()
app.exec()
```

要在 PyQt6 中将 UI 加载到现有对象上，例如在您的 `QMainWindow.init` 中，您可以调用 `uic.loadUI`，并将 `self`（现有控件）作为第二个参数传递。

```python
import sys
from PyQt6 import QtCore, QtGui, QtWidgets
from PyQt6 import uic


class MainWindow(QtWidgets.QMainWindow):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        uic.loadUi("mainwindow.ui", self)
        
        
app = QtWidgets.QApplication(sys.argv)
window = MainWindow()
window.show()
app.exec()
```

PySide6 加载器不支持此功能—— `.load` 的第二个参数是您正在创建的控件的父控件。这会阻止您将自定义代码添加到控件的 `__init__` 块中，但您可以使用一个单独的函数来解决这个问题。

```python
import sys
from PySide6 import QtWidgets
from PySide6.QtUiTools import QUiLoader

loader = QUiLoader()

def mainwindow_setup(w):
    w.setWindowTitle("MainWindow Title")
    
app = QtWidgets.QApplication(sys.argv)

window = loader.load("mainwindow.ui", None)
mainwindow_setup(window)
window.show()
app.exec()
```

## 将UI文件转换为Python

两者都提供了相同的脚本，用于从 Qt Designer `.ui` 文件生成可导入 Python 的模块。对于 PyQt6，该脚本名为 `pyuic5` 

```bash
pyuic6 mainwindow.ui -o MainWindow.py
```

然后，您可以导入 `UI_MainWindow` 对象，并通过多继承方式从您使用的基类（例如 `QMainWindow`）派生子类，然后调用 `self.setupUI(self)` 来设置用户界面。

```python
import sys
from PyQt6 import QtWidgets
from MainWindow import Ui_MainWindow


class MainWindow(QtWidgets.QMainWindow, Ui_MainWindow):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setupUi(self)
        
        
app = QtWidgets.QApplication(sys.argv)
window = MainWindow()
window.show()
app.exec()
```

对于 PySide6，其名称为 `pyside6-uic` 

```bash
pyside6-uic mainwindow.ui -o MainWindow.py
```

后续设置完全相同。

```python
import sys
from PyQt6 import QtWidgets
from MainWindow import Ui_MainWindow


class MainWindow(QtWidgets.QMainWindow, Ui_MainWindow):
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setupUi(self)
        
        
app = QtWidgets.QApplication(sys.argv)
window = MainWindow()
window.show()
app.exec()
```

![tips](tips.png)

> 有关在 PyQt6 或 PySide6 中使用 Qt Designer 的更多信息，请参阅 Qt Creator 章节。

## exec() 还是 exec_()

`.exec()` 方法用于 Qt 中启动 `QApplication` 或对话框的事件循环。在 Python 2.7 中，`exec` 是关键字，因此无法用于变量、函数或方法名称。PyQt4 和 PySide 中采用的解决方案是将 `.exec` 的使用改为 `.exec_()` 以避免此冲突。

Python 3 移除了 `exec` 关键字，释放了该名称以便重新使用。因此，从 Qt6 开始，所有 `.exec()` 调用都与 Qt 本身中的命名方式一致。然而，PySide6 仍然支持 `.exec_()`，因此如果您在某些代码中看到这个，不要感到惊讶。

## 槽与信号

在两个库中，定义自定义槽和信号时使用的语法略有不同。PySide6 在 `Signal` 和 `Slot` 名称下提供了此接口，而 PyQt6 则分别在 `pyqtSignal` 和 `pyqtSlot` 名称下提供了此接口。它们在定义槽和信号时的行为完全相同。

以下 PyQt6 和 PySide6 示例是相同的——

```python
my_custom_signal = pyqtSignal() # PyQt6
my_custom_signal = Signal() # PySide6

my_other_signal = pyqtSignal(int) # PyQt6
my_other_signal = Signal(int) # PySide6
```

或者对于一个槽——

```python
@pyqtslot
def my_custom_slot():
    pass

@Slot
def my_custom_slot():
    pass
```

如果您想确保 PyQt6 和 PySide6 之间的一致性，可以使用以下导入模式，以便 PyQt6 也能使用 `Signal` 和 `@Slot` 样式。

```python
from PyQt6.QtCore import pyqtSignal as Signal, pyqtSlot as Slot
```

![information](information.png)

> 当然，您也可以从 `PySide6.QtCore` 导入 `Signal` 作为 `pyqtSignal`，导入 `Slot` 作为 `pyqtSlot`，尽管这会有些令人困惑。

## QMouseEvent

在 PyQt6 中，`QMouseEvent` 对象不再具有用于访问事件位置的 `.pos()`、`.x()` 或 `.y()` 缩写属性方法。您必须使用 `.position(`) 属性来获取 `QPoint` 对象，并访问其上的 `.x()` 或 `.y()` 方法。`.position()` 方法在 PySide6 中也可用。

## PySide6 中存在但 PyQt6 中不存在的功能

从 Qt 6 开始，PySide 支持两个 Python 功能标志，以帮助代码更符合 Python 风格，使用蛇形变量名 (`snake_case`)，并能够直接分配和访问属性，而不是使用 getter/setter 函数。下面的示例显示了这些更改对代码的影响：

*Listing 311. Standard PySide6 code*

```python
table = QTableWidget()
table.setColumnCount(2)

button = QPushButton("Add")
button.setEnabled(False)

layout = QVBoxLayout()
layout.addWidget(table)
layout.addWidget(button)
```

相同的代码，但启用了 `snake_case` 和 `true_property`。

*Listing 312. PySide6 code with Snake case & properties.*

```python
from __feature__ import snake_case, true_property

table = QTableWidget()
table.column_count = 2

button = QPushButton("Add")
button.enabled = False

layout = QVBoxLayout()
layout.add_widget(table)
layout.add_widget(button)
```

这些功能标志对代码可读性有所提升，然而由于它们在 PyQt6 中不被支持，这使得在不同库之间进行迁移变得更加困难。

## 在两种库中都支持的特性

![tips](tips.png)

> 如果您正在开发独立的应用程序，则无需担心这个问题。只需使用您偏好的任何 API 即可。

如果您正在编写一个与 PyQt6 和 PySide6 兼容的库、控件或其他工具，只需添加两组导入即可轻松实现。

```python
import sys

if 'PyQt6' in sys.modules:
    # PyQt6
    from PyQt6 import QtGui, QtWidgets, QtCore
    from PyQt6.QtCore import pyqtSignal as Signal, pyqtSlot as Slot
    
else:
    # PySide6
    from PySide6 import QtGui, QtWidgets, QtCore
    from PySide6.QtCore import Signal, Slot
```

这是我们的自定义控件库中使用的方法，我们通过导入一个库来支持 PyQt6 和 PySide6。唯一需要注意的是，在导入该库时，必须确保先导入 PyQt6（如上行或更早行），以确保它位于 `sys.modules` 中。

为了弥补PyQt6中缺少简写枚举和标志，您可以自行生成这些内容。例如，以下代码将为每个枚举对象的元素复制引用，直至其父对象，使其可像在PyQt5、PySide2和PySide6中一样访问。该代码仅需在PyQt6环境下运行。

```python
enums = [
    (QtCore.Qt, 'Alignment'),
    (QtCore.Qt, 'ApplicationAttribute'),
    (QtCore.Qt, 'CheckState'),
    (QtCore.Qt, 'CursorShape'),
    (QtWidgets.QSizePolicy, 'Policy'),
]

# 使用长名称进行查找（例如 QtCore.Qt.CheckState.Checked，用于 PyQt6）并以短名称存储（例如 QtCore.Checked，用于 PyQt5、PySide2 且被 PySide6 接受）。
for module, enum_name in enums:
    for entry in getattr(module, enum_name):
        setattr(module, entry.name, entry)
```

或者，您可以定义一个自定义函数来处理命名空间查找

```python
def _enum(obj, name):
    parent, child = name.split('.')
    result = getattr(obj, child, False)
    if result: # 仅使用短名称进行查找.
        return result
    
    obj = getattr(obj, parent) # 获取父节点，然后获取子节点.
    return getattr(obj, child)
```

当传入一个对象和一个与 PyQt6 兼容的长格式名称时，此函数将在 PyQt6 和 PySide6 上均返回正确的枚举值或标志。

```python
>>> _enum(PySide6.QtCore.Qt, 'Alignment.AlignLeft')
PySide6.QtCore.Qt.AlignmentFlag.AlignLeft
>>> _enum(PyQt6.QtCore.Qt, 'Alignment.AlignLeft')
<Alignment.AlignLeft: 1>
```

如果您在多个文件中这样做，可能会有点麻烦。一个不错的解决方案是将导入逻辑和自定义适配方法移动到一个单独的文件中，例如在项目根目录下命名为 `qt.py`。该模块从两个库中的一个导入 Qt 模块（`QtCore`、`QtGui`、`QtWidgets` 等），然后您可以从那里导入到你的应用程序中。

`qt.py` 文件的内容与我们之前使用的相同 —

```python
import sys
if 'PyQt6' in sys.modules:
    # PyQt6
    from PyQt6 import QtGui, QtWidgets, QtCore
    from PyQt6.QtCore import pyqtSignal as Signal, pyqtSlot as Slot
else:
    # PySide6
    from PySide6 import QtGui, QtWidgets, QtCore
    from PySide6.QtCore import Signal, Slot
    
    
def _enum(obj, name):
    parent, child = name.split('.')
    result = getattr(obj, child, False)
    if result: # 仅使用短名称进行查找.
        return result
    
    obj = getattr(obj, parent) # 获取父节点，然后获取子节点.
    return getattr(obj, child)
```

您必须记得在if语句的两支分支中添加您使用的其他PyQt6模块（如browser、multimedia等）。随后，您可以按照以下方式将Qt6导入到您自己的应用程序中：

```python
from .qt import QtGui, QtWidgets, QtCore, _enum
```

…并且它将能够在两个库之间无缝运行。

## 这就是全部了

没什么好说的了——这两个库确实非常相似。不过，如果您在使用PyQt6/PySide6时遇到任何其他示例或功能，而这些内容难以直接转换，请随时与我联系。
