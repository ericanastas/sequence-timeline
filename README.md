# d3.sequence-timeline #

D3 based visualization of chronological events in a combined sequence diagram style timeline.

# Lines #
- Each line in the diagram is given a unique name identifier
- The line or channel identifier
- This could be a username, file name etc..
	
# Event Properties #

```
#!javascript

{
    "desc":"Event 1",
    "time":"2012-04-23T18:25:43.511Z",
    "src":"Source Line",
    "tgt":"target line",
    "class"="failed",
    "dur":300,
    "pos":"endSrc"
    "det":{"Field 1": "Value 1",
           "Field 2": "Value 2",
           "Field 3": "Value 3" };

}
```

### Base Properties ###

- String `desc`: A short description of the event
- Date `time`: The date/time of the event occurred
- String `src`: The source line of the event
- String `tgt`: The target of the event 
    - May be set to the same as the source for events that are not between lines
- String `class`: The CSS class to apply to the event elements
- Object `det: An object with additional details about the event which is displayed through a tooltip.`


#### Duration ###

Events can have a duration which cause the event to show up as a duration bar. 

- Number `dur`: The duration of the event in seconds
    - May be null or zero if event occurs at a specific point in time
     - Events with a null or zero duration will show up as a circle. 
     - This could still use the options below to determine if the circle is drawn on the source or target line.
- String `pos`: The location of the duration bar for the event
    - `startSrc`: Starts on the source line at `time`
    - `endSrc`: Ends on the source line at `time`
    - `startTgt`: Starts on the target line at `time`
    - `endTgt`: Ends on the target line at `time`

### Created/Destroyed ###

- Lines can be created and destroyed over the timeline. 
- Any line which does not have a corresponding created event is assumed to have been created before the start of the diagram. 

- Line could create itself with an event where `Source` = `Target`

- Bool `tgtCre`: Identifies if the target was created by this event

- Should it be possible for the Source to be created by an event as well? I think the assumption is the source exists before the event

- Bool `tgtDes`: The Target line is destroyed by the event
- Bool `srcDes`: The Source line is destroyed by the event


### Activation ###

- Activation
    - Lines can be activated and deactivated


#### Event Graphic Representation ###

'src' and 'tgt' are different: Show arrow between lines

'src and 'tgt" are the same: No Arrow

'dur' > 0: Show duration bar

'dur' == 0 | 'dur' == null: Show circle at event

	
## Draw Logic ##


1. Iterate over all events
    - Determine all line ids
    - Record the earliest and latest event
    - Sort event chronologically

2. Determine Band(s) when each time line is alive
    - Line must exist whenever there is an event
    - If first event is not a created event then assume line is created before current range
    - If first event is a created event then show band created at that time
    - Always destroy line on destroy event
    - Line may be recreated after a destroy event by any other event	
	
3. Determine Band(s) when each time line is active

4. Draw Events over bars
    - Append event bar if there is a duration
    - Append event circle if no duration
    - If Source != Target: Draw event arrow
	
## Filtering / Hiding Lines ##
- Should be able to filter out/hide lines
- Single arrows to/from hidden lines should still show up as short visible lines to/from empty space	
	

## Auto-sort Bars/Lines ##

- Attempt to autosort the lines to reduce the number of crossing lines
- Start with a random sort of the lines
- For each line count the number of event lines up and down to determine the preferred move direction for the line
- Weight the strength of each line based on their length
- Move all the lines in the weighted direction
- repeat