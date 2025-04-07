---
title: Introduction to the shell
---

This section of my notes will deal with the shell (mostly bash).

## Terminal / console / shell

A **terminal** (or to be more precise, a terminal emulator) is a software, that allows you to access the system through a shell. Historically, the terminal meant a physical device with a monitor and a keyboard that let you type in commands. Nowadays, the word terminal means a terminal emulator, which is a program that is responsible to process your keystrokes and show text on the screen. E.g. in Ubuntu the default terminal is the Gnome Terminal.

The word **console** is used for a command line interface in a text only interface, while the terminal is used for the CLI in a graphical user interface (GUI). The two terms are often used interchangeably.

A **shell** is the software that actually interprets you commands and executes them. Shells are often referred to as REPL (Read, Eval, Print, Loop). E.g. on Ubuntu the default shell is bash, on MacOs it's Zsh. There are several other shells.

## Most important commands

```bash
echo "Hello world"  # Write something to the console
whoami              # Writes username to console
history             # Writes the command history to the console
clear               # Clears your console (not your history)
```

### Directories and files

You can move around your file system using commands.

```bash
pwd                 # Print current directory path

cd directory_name               # Change directory: go to directory_name
cd relative/path                # Specify directory using relative path
cd /var/something               # Specify directory using absolute path
cd /                            # Go to root directory
cd ~                            # Go to home directory
cd ..                           # Go to parent directory
```

To list the contents of a directory, you can run the `ls` command (optionally with various flags).

```bash
ls                  # List content of current directory
ls -a|--all         # List all (incl. hidden) content
ls -l               # List content in long form (incl. permissions)
```

You can use the shell to create, remove, move or copy files and directories.

```bash
mkdir dir_name                  # Create directory "dir_name"
touch filename.txt              # Create empty file with name "filename.txt"

rm filename.txt                 # Remove file
rm -r|-R|--recursive dirname    # Remove directory and its content recursively

mv file.txt new_file.txt        # Rename file
mv file.txt directory_name/     # Move file to another directory
cp file.txt directory_name/     # Copy file
```

To print the contents of a file, you can use the `cat` command (for the entire content) or `less` command for longer files. You can also print the first or last couple of lines using `head` or `tail` respectively. You can check the length of a file with `wc`.

```bash
cat filename.txt                # Print contents of file (concatenate)
cat file1.txt file2.txt         # Concatenate and print contents of multiple files
less filename.txt               # Print part of the file content in interactive session
head -n 5 filename.txt          # Print first n lines of file content
tail -n 5 filename.txt          # Print last n lines of file content

wc filename.txt                 # List number of lines words and characters in the file
```

To search in a file, you can use the `grep` command, which takes a search query string or regular expression and a filename and prints the lines of the file in which the search query was found.
To search for files based on their names, you can use the `find` command.

```bash
grep "hello" words.txt                      # Search for the word "hello" in the file
grep "hello" file1.txt file2.txt            # Search in multiple files
grep -r "hello" .                           # Search for a word in a whole directory
find directory_name -name filename.txt      # Search for a file in a directory
find directory_name -name "*.txt"           # Search for all .txt files
find directory_name -name "*log*"           # Search for filenames containing log
```

### File permissions

To read, write and/or execute files and directories, users need permission. These can be managed using the `chmod` (change mode) command in the shell.

```bash
chmod
chown
sudo
```

### Manuals and getting help

```bash
man ls                  # Show the manual for the ls program
```

### Input and output

standard output: stdout
standard error: stderr
standard input: stdin

```bash
echo "Hello world"                                  # Writes "Hello world" to standard output
grep "debit" transactions.csv > /tmp/debit.txt      # Redirect stdout to file
my_script.sh 2> /tmp/error.log                      # Redirect stderr to file
read NAME                                           # Reads from stdin into variable NAME
echo "Hello world" | wc -w                          # Pipes the stdout of first function into stdin of the second
```

### Processes

You can interrupt the program with `ctrl + c`.
If this does not work, you can manually kill the program from another shell session with `kill`. You can check the process ID of the nonresponding program with `ps`

```bash
ps aux                          # Shows information about processes (incl. run by other users with extra information)
ps aux | grep "my_program.sh"   # Shows information about processes and pipes the list into grep to search for my program
kill PID                        # Kill process with id PID
top                             # Lists processes by CPU usage (by default)
```

You can press `M` while running `top` to sort by memory usage.

## Bash as a programming language

### Variables and Environment

```bash
name="John Doe"
echo $name
```

## The Unix Philosophy

1. Write programs that do one thing and do it well. (e.g. ls, grep, less, etc.)
2. Write programs to work together. (e.g. output is pipeable into the other program)
3. Write programs to handle text streams, because that is a universal interface.

## Package Managers

You can use package managers to:

- Download software from official sources
- Install software
- Update software
- Remove software
- Manage dependencies

On Ubuntu, the default package manager is `apt` (Advanced Package Tool)

You can look where a package is installed on your system with `which`.

```bash
sudo apt update
sudo apt install neovim
which nvim
```

Installation process:

The package manager will

1. ...look if the software isn't already installed
2. ...download the package from a repository
3. ...install the package
4. ...install any dependencies that the package needs
5. ...add the software to the PATH if it should be there
