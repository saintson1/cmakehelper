cmake_minimum_required(VERSION 3.0...3.5)

set(PROJECT_NAME laba2)
set(SOURCE_DIR src)

project("laba2")

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED true)

set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS ON)

add_executable(taskA ${SOURCE_DIR}/taskA.cpp)
# add_executable(taskB ${SOURCE_DIR}/taskB.cpp)
# add_executable(taskC ${SOURCE_DIR}/taskC.cpp)
# add_executable(taskD ${SOURCE_DIR}/taskD.cpp)
# add_executable(taskE ${SOURCE_DIR}/taskE.cpp)
# add_executable(taskF ${SOURCE_DIR}/taskF.cpp)
# add_executable(taskG ${SOURCE_DIR}/taskG.cpp)
