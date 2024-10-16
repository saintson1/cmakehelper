#include <iostream>
#include <vector>

template <typename data_type, typename = std::void_t<decltype(data_type{})>>
class my_list
{
 private:
  struct my_node
  {
    my_node *next_ = nullptr;
    // my_node *prev_ = nullptr;
    data_type data_;

    my_node(data_type new_data) : data_(new_data) {  };

    // my_node(data_type new_data, my_node *new_prev, my_node *new_next) : data_(new_data), next_(new_next), prev_(new_prev) {  };
    my_node(data_type new_data, my_node *new_next) : data_(new_data), next_(new_next) {  };

    my_node & operator=(const my_node & new_node) const
    {
      data_ = std::move(new_node.data_);
      next_ = new_node.next_;
      // prev_ = new_node.prev_;

      return *this;
    };

    my_node & operator=(my_node && new_node)
    {
      data_ = std::move(new_node.data_);
      next_ = new_node.next_;
      // prev_ = new_node.prev_;
      new_node.next_ = nullptr;
      // new_node.prev_ = nullptr;

      return *this;
    }
  };

 private:
  my_node *head_ = nullptr;
  // my_node *tail_ = nullptr;
  std::size_t size_ = 0;
  std::size_t capacity_ = 0;

 public:
  my_list() = default;

  my_list(data_type new_data) : head_(new my_node{new_data}) {
    head_ = new my_node{new_data};
    ++size_, ++capacity_;
  };
  void push(data_type new_data) {
    if (head_) {
      head_ = new my_node{new_data, head_};
    } else {
      head_ = new my_node{new_data};
    }
    ++size_, ++capacity_;
  };

  data_type pop() {
    if (!head_)
      return data_type{};

    data_type old_data = head_->data_;
    my_node* tmp = head_;

    head_ = head_->next_;
    delete tmp;
    --size_, --capacity_;
    return old_data;
  };

  inline std::size_t size() { return size; };
};

int main( int argc, char *argv[])
{
  using data_type = int;
  // int cont_size;
  // std::cin >> cont_size;
  my_list<int> cont;

  while (argc) {
    std::cout << argv[argc-- - 1] << std::endl;
  }
  for (int ind = 0, end = 10; ind != end; ++ind)
    cont.push(ind);

  for (int ind = 0, end = 10; ind != end; ++ind)
    std::cout << cont.pop() << " ";
  std::cout << std::endl;
  // for (auto& elem : cont)
  //   std::cout << elem << " ";
  // std::cout << std::endl;

  return 0;
}