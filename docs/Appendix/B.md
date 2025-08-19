---
prev:
  text: '附录A：安装 PyQt6'
  link: '/Appendix/A'
next:
  text: '附录C：PyQt6 和 PySide6 两者有何不同？'
  link: '/Appendix/C'
---

## 附录B：将 C++ 示例翻译为 Python

在使用PyQt6编写应用程序时，我们实际上是在使用Qt编写应用程序。

PyQt6 作为 Qt 库的包装器，将 Python 方法调用转换为 C++，处理类型转换，并透明地创建 Python 对象来代表应用程序中的 Qt 对象。所有这些巧妙的设计使您可以在编写大部分 Python 代码时使用 Qt（如果忽略驼峰式命名法的话）。

虽然网上有很多PyQt6示例代码，但Qt C++示例代码要多得多。核心文档是为C++编写的。该库是用C++编写的。这意味着，有时当您想要了解如何实现某项功能时，您找到的唯一资源可能是C++教程或一些C++代码。

您能使用它吗？当然可以！如果您没有C++（或类似C的语言）的经验，那么代码看起来可能像天书一样。但在您熟悉Python之前，Python可能也看起来有点像天书。你您需要会写C++就能阅读它。理解和解读比编写更容易。

只需稍作努力，您就能将任何 C++ 示例代码转换为功能完整的 Python 的 PyQt6 代码。在本章中，我们将选取一段 Qt5 代码，并逐步将其转换为可正常运行的 Python 代码。

## 示例代码

我们先从以下代码块开始，创建一个简单的窗口，其中包含一个 `QPushButton` 和一个 `QLineEdit`。按下按钮将清除行编辑内容。这看起来非常令人兴奋，但其中包含将 Qt 示例转换为 PyQt6 的几个关键部分，即控件、布局和信号。

```c++
#include <QtWidgets>

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    QWidget window;
    QLineEdit *lineEdit = new QLineEdit();
    QPushButton *button = new QPushButton("Clear");
    QHBoxLayout *layout = new QHBoxLayout();
    layout->addWidget(lineEdit);
    layout->addWidget(button);
    
    QObject::connect(&button, &QPushButton::pressed,
                     &lineEdit, &QLineEdit::clear);
    window.setLayout(layout);
    window.setWindowTitle("Why?");
    window.show();
    return app.exec();
}
```

![tips](tips.png)

> 请记住，没有父控件的 Qt 控件总是单独的窗口。这里，我们创建了一个作为 `QWidget` 的单个窗口。

下面我们将逐步讲解如何将这段代码转换为Python代码。

## 导入语句

在 C++ 中，导入（import）被称为包含（include）。它们位于文件的顶部，与 Python 类似（尽管只是出于惯例），并且看起来像这样——

```c++
#include <QtWidgets>
```

在 C 类语言中，`#` 表示 `include` 是预处理指令，而不是注释。`<> `之间的值是要导入的模块的名称。请注意，与 Python 不同，导入模块会将该模块的所有内容都放在全局命名空间中。这相当于在 Python 中执行以下操作：

```python
from PyQt6.QtWidgets import *
```

像这样的全局导入在 Python 中通常是不被推荐的，您应该改用以下方式之一：

1. 仅导入所需的对象，或
2. 导入模块本身并通过它引用其子对象

```python
from PyQt6.QtWidgets import QApplication, QWidget, QLineEdit, QPushButton, QHBoxLayout
```

或者，换一种说法……

```python
from PyQt6 import QtWidgets
```

……然后引用为 `QtWidgets.QApplication()`。您在自己的代码中选择哪种样式完全取决于您的喜好，但在本例中，我们将遵循第一种样式。将此应用于代码后，到目前为止，我们得到了以下结果。

```c++
from PyQt6.QtWidgets import (
    QApplication, QWidget, QLineEdit, QPushButton, QHBoxLayout
)

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    QWidget window;
    QLineEdit *lineEdit = new QLineEdit();
    QPushButton *button = new QPushButton("Clear");
    QHBoxLayout *layout = new QHBoxLayout();
    layout->addWidget(lineEdit);
    layout->addWidget(button);
    QObject::connect(&button, &QPushButton::pressed,
                     &lineEdit, &QLineEdit::clear);
    window.setLayout(layout);
    window.setWindowTitle("Why?");
    window.show();
    return app.exec();
}
```

![information](information.png)

> 由于我们是通过迭代方式进行修改，因此代码在最终完成前都不会正常工作。

## int main(int argc, char *argv[])

每个 C++ 程序都需要一个 `main(){}` 代码块，其中包含应用程序执行时首先运行的代码。在 Python 中，模块顶层的任何代码（即未嵌套在函数、类或方法内部的代码）将在脚本执行时被运行。

```c++
from PyQt6.QtWidgets import (
    QApplication, QWidget, QLineEdit, QPushButton, QHBoxLayout
)
    
QApplication app(argc, argv);
QWidget window;
QLineEdit *lineEdit = new QLineEdit();
QPushButton *button = new QPushButton("Clear");
QHBoxLayout *layout = new QHBoxLayout();
layout->addWidget(lineEdit);
layout->addWidget(button);
QObject::connect(&button, &QPushButton::pressed,
                 &lineEdit, &QLineEdit::clear);
window.setLayout(layout);
window.setWindowTitle("Why?");
window.show();
app.exec();
```

您可能在 Python 应用程序代码中见过以下代码块，它也被称为`__main__` 块。

```python
if __name__ == '__main__':
# ...your code here...
```

然而，这种方式的工作原理略有不同。虽然当脚本被执行时，这个块会被执行，但任何未缩进的代码也会被执行。这个块的实际目的是防止在模块被导入时执行这段代码，而不是作为脚本执行。

您可以将代码嵌套在这个代码块中，尽管除非您的文件将被作为模块导入，否则这并非严格必要。

## C++ 类型

Python 是一种动态类型语言，这意味着您可以在变量定义后更改其类型。例如，以下代码是完全有效的 Python。

```python
a = 1
a = 'my string'
a = [1,2,3]
```

许多其他语言，包括C++在内，都是静态类型的，这意味着一旦定义了变量的类型，就不能再更改它。例如，以下代码绝对不是有效的C++代码。

```c++
int a = 1;
a = 'my string';
```

上述内容突显了静态类型语言的直接后果：在创建变量时定义其类型。

在 C++ 中，这是通过在定义变量时在变量声明行上显式提供类型装饰器来实现的，位于 `int` 之上。

在类似以下的语句中，第一个名称是正在被创建的类型（类）的名称，而语句的其余部分用于定义该类型。

```c++
QApplication app(argc, argv);
QWidget window;

QLineEdit *lineEdit = new QLineEdit();
QPushButton *button = new QPushButton("Clear");
QHBoxLayout *layout = new QHBoxLayout();
```

在 Python 中，我们不需要这些类型定义，因此可以直接删除它们。

```python
lineEdit = new QLineEdit();
button = new QPushButton("Clear");
layout = new QHBoxLayout();
```

对于应用程序和窗口，原理完全相同。然而，如果您不熟悉C++，可能不会立即意识到这些代码行正在创建一个变量。

在 C++ 中，使用 `new` 创建对象与不使用 `new` 创建对象之间存在差异，但在 Python 中，您无需关心这一点，可以将它们视为等价的。

```c++
QWidget *window = new QWidget();
QWidget window;
QApplication *app = new QApplication(argc, argv);
QApplication app;
```

要转换为 Python，请从左侧获取类名（例如 `QApplication`），并将其放置在开括号和闭括号`()`之前，如果它们不存在，则添加它们。然后将变量名移到左侧，并添加一个 `=` 。对于 `window`，我们应该这样——

```python
window = QWidget()
```

在 Python 中，`QApplication` 仅接受一个参数，即来自 `sys.argv`（等同于 `argv`）的参数列表。这为我们提供了以下代码 

```python
import sys
app = QApplication(sys.argv);
```

到目前为止，我们的完整代码块看起来如下所示。

```c++
from PyQt6.QtWidgets import (
    QApplication, QWidget, QLineEdit, QPushButton, QHBoxLayout
)
    
import sys
app = QApplication(argc, argv);
window = QWidget()
lineEdit = QLineEdit();
button = QPushButton("Clear");
layout = QHBoxLayout();
layout->addWidget(lineEdit);
layout->addWidget(button);
QObject::connect(&button, &QPushButton::pressed,
                 &lineEdit, &QLineEdit::clear);
window.setLayout(layout);
window.setWindowTitle("Why?");
window.show();
app.exec();
```

## 信号

信号是使示例正常运行的关键，但遗憾的是，C++ 语法对于 Qt 信号来说有些复杂。我们正在使用的示例信号如下所示。

```c++
QObject::connect(&button, &QPushButton::pressed,
                 &lineEdit, &QLineEdit::clear);
```

如果您不熟悉 C++，这段内容可能很难理解。但如果我们移除所有语法，就会清晰得多。

```c++
connect(button, QPushButton.pressed, lineEdit, QLineEdit.clear)
// or...
connect(<from object>, <from signal>, <to object>, <to slot>>)
```

从左到右依次为：我们连接的对象、我们连接的信号、我们连接的对象，最后是我们连接的对象上的槽（或函数）。这相当于在 PyQt6 中编写以下代码：

```python
button.pressed.connect(lineedit.clear)
```

进行该更改后，我们在进行中的代码中将获得以下内容：

```c++
from PyQt6.QtWidgets import (
    QApplication, QWidget, QLineEdit, QPushButton, QHBoxLayout
)
app = QApplication(sys.argv)
window = QWidget()
lineEdit = QLineEdit()
button = QPushButton("Clear")
layout = QHBoxLayout()
layout->addWidget(lineEdit);
layout->addWidget(button);

button.pressed.connect(lineEdit.clear)
    
window.setLayout(layout);
window.setWindowTitle("Why?");
window.show();
app.exec();
```

## 语法

到目前为止，我们已经处理了所有特别棘手的部分，因此可以进行最后的语法校正。这些操作只需简单的搜索替换即可完成。

首先搜索所有 `->` 或 `::` 的实例，并替换为 `.` .。您会发现 C++ 代码在某些地方也使用了 `.`  ——这与这些变量更简化的创建方式有关（`new` 与否）。同样，您可以在这里忽略这一点，并简单地使用 `.` 代替。

```python
layout.addWidget(lineEdit);
layout.addWidget(button);
```

最后，删除所有行尾的分号（`;`）标记。

```python
layout.addWidget(lineEdit)
layout.addWidget(button)
```

![tips](tips.png)

> 从技术上讲，您不需要这样做，因为 `;` 是 Python 中有效的行结束符。只是没有必要。

以下代码现在在Python上运行正常。

```python
import sys

from PyQt6.QtWidgets import (
    QApplication,
    QHBoxLayout,
    QLineEdit,
    QPushButton,
    QWidget,
)

app = QApplication(sys.argv)
window = QWidget()
lineEdit = QLineEdit()
button = QPushButton("Clear")
layout = QHBoxLayout()
layout.addWidget(lineEdit)
layout.addWidget(button)

button.pressed.connect(lineEdit.clear)

window.setLayout(layout)
window.setWindowTitle("Why?")
window.show()
app.exec()
```

在 Python 代码中，通常（尽管不是必需的）会继承窗口类，以便初始化代码可以包含在 `__init__` 块中。下面的代码已重新组织为这种结构，将除创建窗口对象（现在为 `MyWindow`）和 `app`，以及 `app.exec()` 调用之外的所有内容移至 `__init__` 块中。

```python
import sys

from PyQt6.QtWidgets import (
    QApplication,
    QHBoxLayout,
    QLineEdit,
    QPushButton,
    QWidget,
)


class MyWindow(QWidget):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        lineEdit = QLineEdit()
        button = QPushButton("Clear")
        layout = QHBoxLayout()
        layout.addWidget(lineEdit)
        layout.addWidget(button)
        
        button.pressed.connect(lineEdit.clear)
        
        self.setLayout(layout)
        self.setWindowTitle("Why?")
        self.show()
        
        
app = QApplication(sys.argv)
window = MyWindow()
app.exec()
```

## 将该流程应用于您自己的代码

这是一个非常简单的示例，然而如果您遵循相同的流程，您可以可靠地将任何C++ Qt代码转换为其Python等价代码。在转换您自己的代码示例时，尽量遵循这种分步方法，以最大限度地减少遗漏内容或意外破坏代码的风险。如果您最终得到一段能够运行的Python代码，但它与原代码存在细微差异，那么调试起来可能会很困难。

![information](information.png)

> 如果您有需要帮助翻译的代码示例，您可以随时与我联系，我会尽力为您提供帮助。
