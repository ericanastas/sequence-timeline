# d3.sequence-timeline #

D3 based visualization of chronological events in a combined sequence diagram style timeline.


# Lines #
- Each line in the diagram is given a unique name identifier
- The line or channel identifier
- This could be a username, file name etc..
	
	
# Filtering Lines #
- Should be able to filter out/hide lines
- Single arrows to/from hidden lines should still show up as short visible lines to/from empty space

	
# Event Properties #

### Base Properites ###

- String `Description`: A short description of the event
- Date `TimeStamp`: The date/time of the event occurred
- String `Source`: The source line of the event
- String `Target`: The target of the event 
    - May be set to the same as the source for events that are not between lines
- String `Class`: The CSS class to apply to the event elements


#### Duration ###

Events can have a duration which cause the event to show up as a duration bar. 

- Number `Duration`: The duration of the event
    - May be null or zero if event occurs at a specific point in time
     - Events with a null or zero duration will show up as a circle. 
     - This could still use the options below to determine if the circle is drawn on the source or target line.
- String `Position`: The location of the duration bar for the event
    - `StartSource`: Starts on the source line at TimeStamp
    - `EndSource`: Ends on the source line at TimeStamp 
    - `StartTarget`: Starts on the target line at TimeStamp
    - `EndTarget`: Ends on the target line at TimeStamp

### Created/Destroyed ###

- Lines can be created and destroyed over the timeline. 
- Any line which does not have a corresponding created event is assumed to have been created before the start of the diagram. 

- Line could create itself with an event where `Source` = `Target`



- Bool `TargetCreated`: Identifies if the target was created by this event

- Should it be possible to 




  





#### Activation ###

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
    - 
	
	
	

# Auto-sort Bars/Lines #

- Attempt to autosort the lines to reduce the number of crossing lines
- Start with a random sort of the lines
- For each line count the number of event lines up and down to determine the prefered move direction for the line
- Move all the lines in the weighted direction
- repeat