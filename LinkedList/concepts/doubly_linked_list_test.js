// 이중 연결 리스트(Doubly Linked List)
// 일반 연결 리스트는 다음 노드의 연결 정보만 갖고있지만
// 이중 연결 리스트는 다음 노드, 이전 노드의 정보 전부 가지고 있음. => 양방향 순회 가능

function DoublyLinkedList() {
  let Node = function (element) {
    this.element = element;
    this.next = null;
    this.prev = null; //NEW
  };

  let length = 0;
  let head = null;
  let tail = null; //NEW

  this.append = function (element) {
    let node = new Node(element),
      current;

    if (head === null) {
      //리스트가 비어있다면
      head = node;
      tail = node; //NEW
    } else {
      //테일 노드를 붙인다 //NEW
      tail.next = node;
      node.prev = tail;
      tail = node;
    }

    length++; //리스트의 크기를 업데이트한다
  };

  this.insert = function (position, element) {
    //범위 이외의 값인지 체크한다
    if (position >= 0 && position <= length) {
      let node = new Node(element),
        current = head,
        previous,
        index = 0;

      if (position === 0) {
        //첫 번째 위치에 추가

        if (!head) {
          //NEW
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node; //NEW {1}
          head = node;
        }
      } else if (position === length) {
        //마지막 원소 //NEW

        current = tail; // {2}
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          //{3}
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;

        current.prev = node; //NEW
        node.prev = previous; //NEW
      }

      length++; //리스트의 크기를 업데이트한다

      return true;
    } else {
      return false;
    }
  };

  this.removeAt = function (position) {
    //범위 이외의 값인지 체크한다
    if (position > -1 && position < length) {
      let current = head,
        previous,
        index = 0;

      //첫 번째 원소를 삭제한다
      if (position === 0) {
        head = current.next; // {1}

        //원소가 하나뿐이라면 tail을 업데이트한다 //NEW
        if (length === 1) {
          // {2}
          tail = null;
        } else {
          head.prev = null; // {3}
        }
      } else if (position === length - 1) {
        //마지막 원소 //NEW

        current = tail; // {4}
        tail = current.prev;
        tail.next = null;
      } else {
        while (index++ < position) {
          // {5}

          previous = current;
          current = current.next;
        }

        //이전 것을 현재의 다음으로 링크한다 - 건너뛴다
        previous.next = current.next; // {6}
        current.next.prev = previous; //NEW
      }

      length--;

      return current.element;
    } else {
      return null;
    }
  };

  this.remove = function (element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };

  this.indexOf = function (element) {
    let current = head,
      index = -1;

    //첫 번째 원소 체크
    if (element == current.element) {
      return 0;
    }

    index++;

    //중간 원소 체크
    while (current.next) {
      if (element == current.element) {
        return index;
      }

      current = current.next;
      index++;
    }

    //마지막 원소 체크
    if (element == current.element) {
      return index;
    }

    return -1;
  };

  this.isEmpty = function () {
    return length === 0;
  };

  this.size = function () {
    return length;
  };

  this.toString = function () {
    let current = head,
      s = current ? current.element : "";

    while (current && current.next) {
      current = current.next;
      s += ", " + current.element;
    }

    return s;
  };

  this.inverseToString = function () {
    let current = tail,
      s = current ? current.element : "";

    while (current && current.prev) {
      current = current.prev;
      s += ", " + current.element;
    }

    return s;
  };

  this.print = function () {
    console.log(this.toString());
  };

  this.printInverse = function () {
    console.log(this.inverseToString());
  };

  this.getHead = function () {
    return head;
  };

  this.getTail = function () {
    return tail;
  };
}

let dl = new DoublyLinkedList();
dl.append(0);
dl.append(1);
dl.print();
dl.insert(2, 2);
dl.print();
