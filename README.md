# Armory QnA

Experimental, tensorflow based qna tool.

## Usage

```sh
Usage: armqna --knowledge <path> --question <question>

Options:
  --knowledge   Path to knowledge
  --question    Question to get answers for
  --all         Search all files
```

Example:
```sh
armqna --knowledge armory.wiki --question "What are events masks?"
searching for: "What are events masks?" in armory.wiki/Acceuil.md
searching for: "What are events masks?" in armory.wiki/Code-Style.md
searching for: "What are events masks?" in armory.wiki/Events.md
armory.wiki/Events.md
{
  text: 'signed integral numbers that can be used to restrict which listeners are notified about a certain event',
  score: 11.77424144744873,
  startIndex: 2661,
  endIndex: 2763
}
{
  text: 'signed integral numbers',
  score: 11.503923416137695,
  startIndex: 2661,
  endIndex: 2684
}
{
  text: 'signed integral numbers',
  score: 9.617857933044434,
  startIndex: 2661,
  endIndex: 2684
}
{
  text: 'signed integral numbers that can be used to restrict which listeners are notified about a certain event',
  score: 8.976733922958374,
  startIndex: 2661,
  endIndex: 2763
}
{
  text: 'integral numbers that can be used to restrict which listeners are notified about a certain event',
  score: 6.646472930908203,
  startIndex: 2668,
  endIndex: 2763
}
```

