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

## Bash as a programming language

### Variables and Environment

```bash
name="John Doe"
echo $name
```
