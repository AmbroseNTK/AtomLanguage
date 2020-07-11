# Bản mô tả ngôn ngữ lập trình Atom

v1.0

## Kiểu dữ liệu và biến

1. Không cần định kiểu, kiểu dữ liệu một biến phụ thuộc vào giá trị nó đang chứa
2. Một biến được tổ chức dưới dạng JSON
3. Các dạng giá trị: kiểu số, kiểu chuỗi, boolean, null

## Các hàm chuẩn

Set <value|$variable> to <$variable>: Khai báo và gán giá trị cho biến

Ex:

```
Set "Hello World" to $greeting
```

Trong bộ nhớ sẽ khởi tạo vùng nhớ

```json
{ "$greeting": { "value": "Hello World", "children": {} } }
```

Tiếp tục thực hiện

```
Set "Xin chào" to $greeting.vietnamese
```

```json
{
  "$greeting": {
    "value": "Hello World",
    "children": {
      "vietnamese": {
        "value": "Xin chào",
        "children": {}
      }
    }
  }
}
```

Add <value|$variable> to <$variable>: Cộng liên tiếp vào biến

Mul <value|$variable> to <$variable>: Nhân liên tiếp vào biến

Div <value|$variable> to <$variable>: Chia liên tiếp vào biến

Mod <value|$variable> to <$variable>: Chia lấy dư và lưu vào biến

Int <$variable> to <$variable>: Lấy phần nguyên

Array.Create <\$variable>: Tạo một mảng

Array.Append <value|$variable> to <$variable>: Thêm phần tử mới vào mảng

Array.Filter <CONDITION STATEMENT> in <$variable> to <$variable>: Lọc những phần tử thỏa điều kiện

Array.Iterate <$iter> in <$variable>: Tạo biến trỏ vào phần tử trong mảng

Array.Next <$iter>: Trỏ đến phần tử tiếp theo. $iter sẽ null nếu không còn phần tử trong mảng

Tag <tag-name>: Gắn nhãn một đoạn mã

Jump <tag-name> if <CONDITION STATEMENT>: Nhảy đến một nhãn nếu thỏa điều kiện.

Return: Quay về lệnh Jump gần nhất

Import <file-name>: Biên dịch file mã nguồn khác

Begin: Đánh dấu entry point

## CONDITION STATEMENT

Cấu trúc một điều kiện như sau: <$left-value> <operator> <$right-value>

Các operator gồm: =, !=, >, <, <=, >=, and, or, xor
