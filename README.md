# d3.sequence-timeline #

D3 based visualization of chronological events in a combined sequence diagram style timeline.




# Lines #
- Each line in the diagram is given a unique name identifier
- The line or channel identifier
- This could be a username, file name etc..
	
	
# Filtering Lines #
- Should be able to filter out/hide lines
- Single arrows to/from hidden lines should still show up as short visible lines to/from empty space

	
# Event Properties#
- Description: A short description of the event
- TimeStamp: The date/time of the event occurred
- Source: The source line of the event
- Target: The target of the event (May be set to the same as the source for event that are not between life lines)
- TargetCreated: True/false
    - Identifies if the target was created by this event
    - Any line which does not have a corresponding created event is assumed to have been created before the start of the diagram
- Duration: The duration of the event, may be zero if event occurs at a specific point in time
- Position
    - Sets the location of the durration bar for the event
    - Options
        - StartSource: Starts on the source line at TimeStamp
        - EndSource: Ends on the source line at TimeStamp
        - StartTarget: Starts on the target line at TimeStamp
        - EndTarget: Ends on the target line at TimeStamp


	
- Activation
    - Lines can be activated and deactivated
	

# Draw Logic #

1. Iterate over all events an determine all line identifier
2. Determine Band(s) when each time line is alive
    - Line must exist whenever there is an event
    - If first event is not a created event then assume line is created before current range
    - If first event is a created event then show band created at that time
    - Always destory line on destroy event
    - Line may be recreated after a destroy event by any other event		
3. Determine Band(s) when each time line is active
4. Draw Events over bars
	
	
	

# Auto-sort Bars/Lines #

- Attempt to autosort the lines to reduce the number of crossing lines
- Start with a random sort of the lines
- For each line count the number of event lines up and down to determine the prefered move direction for the line
- Move all the lines in the weighted direction
- repeat